import type { SdDocumentMeta, SdGroup } from "@/types/system-design";

export const SD_GROUPS: SdGroup[] = [
  { id: "intro", title: "Start here" },
  { id: "tech", title: "Key Technologies" },
  { id: "concepts", title: "Key Concepts" },
  { id: "questions", title: "Question Breakdowns" },
];

export const SD_CATALOG: SdDocumentMeta[] = [
  {
    slug: "introduction",
    title: "Introduction",
    description:
      "What system design interviews actually test, and a delivery framework you can reuse on every problem.",
    group: "intro",
  },

  {
    slug: "redis",
    title: "Redis",
    description:
      "In-memory store for cache, sessions, rate limits, and presence — not a replacement for your source of truth.",
    group: "tech",
  },
  {
    slug: "elasticsearch",
    title: "Elasticsearch",
    description:
      "Full-text search and aggregations. Async index from your database; accept a little lag.",
    group: "tech",
  },
  {
    slug: "kafka",
    title: "Kafka",
    description:
      "Durable ordered event log. Fan-out many consumers, replay history, buffer spikes.",
    group: "tech",
  },
  {
    slug: "api-gateway",
    title: "API Gateway",
    description:
      "Single front door: TLS, auth, rate limits, routing. Keep business logic out of it.",
    group: "tech",
  },
  {
    slug: "cassandra",
    title: "Cassandra",
    description:
      "Wide-column store for huge write volume and known keys. Model around queries, not relations.",
    group: "tech",
  },
  {
    slug: "dynamodb",
    title: "DynamoDB",
    description:
      "Managed key-value at scale. Partition keys, GSIs, and avoiding hot partitions.",
    group: "tech",
  },
  {
    slug: "postgresql",
    title: "PostgreSQL",
    description:
      "Default relational database. Transactions, joins, and indexes — start here unless scale forces you out.",
    group: "tech",
  },
  {
    slug: "flink",
    title: "Flink",
    description:
      "Stream processing: windows, watermarks, and exactly-once jobs over Kafka.",
    group: "tech",
  },
  {
    slug: "zookeeper",
    title: "ZooKeeper",
    description:
      "Coordination: leader election, distributed locks, and config. Kafka used to need it; you still should know it.",
    group: "tech",
  },
  {
    slug: "websocket",
    title: "WebSocket",
    description:
      "Persistent 2-way pipe — handshake, fleet sharding, and catch-up on reconnect.",
    group: "tech",
  },
  {
    slug: "ip",
    title: "IP",
    description:
      "Internet Protocol — addressing for packet routing, IPv4 vs IPv6, TTL and fragmentation.",
    group: "concepts",
  },
  {
    slug: "osi-model",
    title: "OSI Model",
    description:
      "7 layers framework for networking — Physical to Application, encapsulation and TCP/IP comparison.",
    group: "concepts",
  },
  {
    slug: "tcp-and-udp",
    title: "TCP and UDP",
    description:
      "Transport protocols — TCP reliable handshake vs UDP fast connectionless. Video vs chat.",
    group: "concepts",
  },
  {
    slug: "domain-name-system",
    title: "Domain Name System",
    description:
      "DNS — domain name to IP resolution, hierarchical root/TLD/authoritative, caching and record types.",
    group: "concepts",
  },
  {
    slug: "load-balancing",
    title: "Load Balancing",
    description:
      "Traffic distribution across servers — round-robin, least-connections, L4 vs L7, health checks.",
    group: "concepts",
  },
  {
    slug: "clustering",
    title: "Clustering",
    description:
      "Multiple servers as one system — active-active, active-passive, stateless, shared-nothing.",
    group: "concepts",
  },
  {
    slug: "caching-strategies",
    title: "Caching Strategies",
    description:
      "Cache-aside, write-through, write-behind, and TTL + invalidation.",
    group: "concepts",
  },
  {
    slug: "cdn",
    title: "CDN",
    description:
      "Content Delivery Network — edge PoPs globally, cache hit vs miss, TTL, static content acceleration.",
    group: "concepts",
  },
  {
    slug: "proxy",
    title: "Proxy",
    description:
      "Forward proxy (client privacy) vs reverse proxy (server LB, SSL, cache). Nginx/HAProxy.",
    group: "concepts",
  },
  {
    slug: "availability",
    title: "Availability",
    description:
      "System uptime and fault tolerance — SLA levels, redundancy, RTO/RPO, SPOF avoidance.",
    group: "concepts",
  },
  {
    slug: "scalability",
    title: "Scalability",
    description:
      "Handle growing load — scale up vs scale out, stateless architecture, auto-scaling.",
    group: "concepts",
  },
  {
    slug: "storage",
    title: "Storage",
    description:
      "Block, file, object storage — EBS, NFS, S3. Right storage for right use case.",
    group: "concepts",
  },
  {
    slug: "databases-and-dbms",
    title: "Databases and DBMS",
    description:
      "Structured data stores and the systems that manage them — relational vs non-relational, CRUD and ACID.",
    group: "concepts",
  },
  {
    slug: "sql-databases",
    title: "SQL Databases",
    description:
      "Relational databases — tables, ACID, SQL language, Postgres/MySQL/Oracle, structured data.",
    group: "concepts",
  },
  {
    slug: "nosql-databases",
    title: "NoSQL Databases",
    description:
      "Document, key-value, wide-column, graph — MongoDB, Redis, Cassandra, Neo4j.",
    group: "concepts",
  },
  {
    slug: "sql-vs-nosql-databases",
    title: "SQL vs NoSQL",
    description:
      "Structured+ACID vs flexible+scale — polyglot persistence, when to choose which.",
    group: "concepts",
  },
  {
    slug: "database-replication",
    title: "Database Replication",
    description:
      "Data copy across servers — leader-follower, sync vs async, read replicas, replication lag.",
    group: "concepts",
  },
  {
    slug: "indexes",
    title: "Indexes",
    description:
      "B-tree, hash, LSM — index types, read faster/write slower trade-off, covering indexes.",
    group: "concepts",
  },
  {
    slug: "normalization-and-denormalization",
    title: "Normalization and Denormalization",
    description:
      "Reduce redundancy vs speed up reads — 3NF vs denormalized, OLTP vs OLAP.",
    group: "concepts",
  },
  {
    slug: "acid-vs-base",
    title: "ACID vs BASE",
    description:
      "Strong vs eventual — transactions, availability, and soft-state trade-offs.",
    group: "concepts",
  },
  {
    slug: "cap-theorem",
    title: "CAP Theorem",
    description:
      "Consistency vs availability during partitions, and PACELC for normal latency.",
    group: "concepts",
  },
  {
    slug: "pacelc",
    title: "PACELC",
    description:
      "Extension of CAP — partition picks Availability vs Consistency, otherwise Latency vs Consistency.",
    group: "concepts",
  },
  {
    slug: "transactions",
    title: "Transactions",
    description:
      "ACID properties and isolation levels — atomicity, consistency, durability, concurrent transactions.",
    group: "concepts",
  },
  {
    slug: "distributed-transactions",
    title: "Distributed Transactions",
    description:
      "2PC vs Saga pattern — blocking vs compensation, eventual consistency in microservices.",
    group: "concepts",
  },
  {
    slug: "sharding",
    title: "Sharding",
    description:
      "Split one DB into N — hash, range, geo, and the cross-shard pain.",
    group: "concepts",
  },
  {
    slug: "consistent-hashing",
    title: "Consistent Hashing",
    description:
      "Ring, virtual nodes, and minimal moves on scale — the core of caches and shards.",
    group: "concepts",
  },
  {
    slug: "database-federation",
    title: "Database Federation",
    description:
      "Multiple databases as one — query federation, sharding, polyglot persistence.",
    group: "concepts",
  },
  {
    slug: "n-tier-architecture",
    title: "N-tier Architecture",
    description:
      "Presentation, business logic, data layers — 2-tier vs 3-tier vs N-tier, scalability.",
    group: "concepts",
  },
  {
    slug: "message-brokers",
    title: "Message Brokers",
    description:
      "Middleware for async communication — Kafka, RabbitMQ, decoupling producers/consumers.",
    group: "concepts",
  },
  {
    slug: "message-queue",
    title: "Message Queue",
    description:
      "Decouple with queues — SQS, RabbitMQ, Kafka, and backpressure handling.",
    group: "concepts",
  },
  {
    slug: "publish-subscribe",
    title: "Publish-Subscribe",
    description:
      "Event-driven one-to-many communication — fan-out, topic, subscriber, asynchronous.",
    group: "concepts",
  },
  {
    slug: "enterprise-service-bus",
    title: "Enterprise Service Bus",
    description:
      "Central SOA hub — message routing, protocol conversion, vs API Gateway for microservices.",
    group: "concepts",
  },
  {
    slug: "microservices",
    title: "Microservices vs Monolith",
    description:
      "One deploy vs many services — trade-offs, boundaries, and comms.",
    group: "concepts",
  },
  {
    slug: "event-driven-architecture",
    title: "Event-Driven Architecture",
    description:
      "Events drive the system — async, decoupled, scalable. Producer emits, consumers react.",
    group: "concepts",
  },
  {
    slug: "event-sourcing",
    title: "Event Sourcing",
    description:
      "State = replay of events — append-only log, audit trail, snapshots, CQRS synergy.",
    group: "concepts",
  },
  {
    slug: "command-and-query-responsibility-segregation",
    title: "CQRS",
    description:
      "Commands and queries separate — write model vs read model, eventual consistency.",
    group: "concepts",
  },
  {
    slug: "api-paradigms",
    title: "REST vs GraphQL vs gRPC",
    description:
      "API styles — resource vs query vs streaming, and when to pick which.",
    group: "concepts",
  },
  {
    slug: "long-polling",
    title: "Long Polling vs SSE vs WebSocket",
    description:
      "Push models — polling waste, SSE one-way, WebSocket two-way.",
    group: "concepts",
  },
  {
    slug: "geohashing-and-quadtrees",
    title: "Geohashing and Quadtrees",
    description:
      "Geographic coordinates to encoded strings — prefix match nearby search, quadtree spatial queries.",
    group: "concepts",
  },
  {
    slug: "circuit-breaker",
    title: "Circuit Breaker",
    description:
      "Fail fast when downstream is down — open, half-open, close states.",
    group: "concepts",
  },
  {
    slug: "service-discovery",
    title: "Service Discovery",
    description:
      "Find healthy instances — DNS, registry, and health checks.",
    group: "concepts",
  },
  {
    slug: "sla-slo-sli",
    title: "SLA, SLO, SLI",
    description:
      "Service quality — SLI measure, SLO target, SLA contract. Error budgets for risk.",
    group: "concepts",
  },
  {
    slug: "disaster-recovery",
    title: "Disaster Recovery",
    description:
      "Fail recovery plans — RTO/RPO, backup/pilot/warm/multi-site strategies, DR testing.",
    group: "concepts",
  },
  {
    slug: "virtual-machines-and-containers",
    title: "Virtual Machines and Containers",
    description:
      "VM full OS (heavy) vs container app-level (lightweight) — Docker, Kubernetes.",
    group: "concepts",
  },
  {
    slug: "oauth2-and-openid-connect",
    title: "OAuth 2.0 and OpenID Connect",
    description:
      "Authorization (OAuth) + authentication (OIDC) — tokens, flows, access/refresh tokens.",
    group: "concepts",
  },
  {
    slug: "single-sign-on",
    title: "Single Sign-On",
    description:
      "One login for multiple apps — IdP, SAML/OIDC/Kerberos, centralized authentication.",
    group: "concepts",
  },
  {
    slug: "ssl-tls-mtls",
    title: "SSL, TLS, mTLS",
    description:
      "Encryption protocols — TLS handshake, HTTPS, mutual TLS for service-to-service.",
    group: "concepts",
  },

  {
    slug: "bitly",
    title: "Bitly",
    description:
      "URL shortener — generate a short code, redirect fast, survive read-heavy traffic.",
    group: "questions",
  },
  {
    slug: "dropbox",
    title: "Dropbox",
    description:
      "File storage and sync — chunk uploads, metadata, and conflict handling.",
    group: "questions",
  },
  {
    slug: "local-delivery",
    title: "Local Delivery Service",
    description:
      "Match nearby couriers to orders, track live location, and keep ETAs honest.",
    group: "questions",
  },
  {
    slug: "ticketmaster",
    title: "Ticketmaster",
    description:
      "Inventory under flash sales — hold seats, avoid double-booking, survive spikes.",
    group: "questions",
  },
  {
    slug: "fb-news-feed",
    title: "FB News Feed",
    description:
      "Fan-out timelines, rank posts, and keep the home feed fast at celebrity scale.",
    group: "questions",
  },
  {
    slug: "tinder",
    title: "Tinder",
    description:
      "Geo matching, swipe queues, and a recommendation stack that stays cheap.",
    group: "questions",
  },
  {
    slug: "leetcode",
    title: "LeetCode",
    description:
      "Online judge — isolate untrusted code, grade tests, and queue submissions.",
    group: "questions",
  },
  {
    slug: "whatsapp",
    title: "WhatsApp",
    description:
      "1:1 and group chat — WebSockets, receipts, media, and offline push.",
    group: "questions",
  },
  {
    slug: "rate-limiter",
    title: "Rate Limiter",
    description:
      "Protect APIs with token buckets / sliding windows across many servers.",
    group: "questions",
  },
  {
    slug: "youtube",
    title: "YouTube",
    description:
      "Upload, transcode, adaptive stream, and CDN the bytes — metadata stays in a DB.",
    group: "questions",
  },
  {
    slug: "fb-live-comments",
    title: "FB Live Comments",
    description:
      "Realtime comments on a live video without melting a single chat server.",
    group: "questions",
  },
  {
    slug: "youtube-top-k",
    title: "YouTube Top K",
    description:
      "Trending / top videos — count views at scale and keep a cheap Top-K.",
    group: "questions",
  },
  {
    slug: "uber",
    title: "Uber",
    description:
      "Ride matching with live location, geohash nearby search, and trip state.",
    group: "questions",
  },
  {
    slug: "web-crawler",
    title: "Web Crawler",
    description:
      "Polite BFS of the web: URL frontier, robots.txt, dedup, and storage.",
    group: "questions",
  },
  {
    slug: "ad-click-aggregator",
    title: "Ad Click Aggregator",
    description:
      "Ingest huge click streams, count with late events, and bill advertisers.",
    group: "questions",
  },
  {
    slug: "fb-post-search",
    title: "FB Post Search",
    description:
      "Search friends' posts with privacy filters — not a naive Elasticsearch dump.",
    group: "questions",
  },
  {
    slug: "yelp",
    title: "Yelp",
    description:
      "Local business search: geo + text + ratings, with hot city caches.",
    group: "questions",
  },
  {
    slug: "instagram",
    title: "Instagram",
    description:
      "Photo feed, follows, and fan-out — similar to news feed with heavier media.",
    group: "questions",
  },
  {
    slug: "strava",
    title: "Strava",
    description:
      "Activity tracking, GPS traces, segments, and a social feed of workouts.",
    group: "questions",
  },
  {
    slug: "distributed-cache",
    title: "Distributed Cache",
    description:
      "Cache-aside, consistent hashing, stampede, and what happens when Redis dies.",
    group: "questions",
  },
  {
    slug: "online-auction",
    title: "Online Auction",
    description:
      "Bids in the last seconds — consistency of the winning bid vs throughput.",
    group: "questions",
  },
  {
    slug: "job-scheduler",
    title: "Job Scheduler",
    description:
      "Cron at scale: durable jobs, workers, retries, and no double-run.",
    group: "questions",
  },
  {
    slug: "news-aggregator",
    title: "News Aggregator",
    description:
      "Ingest publishers, dedupe stories, rank a personalized newspaper.",
    group: "questions",
  },
  {
    slug: "price-tracking",
    title: "Price Tracking Service",
    description:
      "Watch product prices, scrape/poll sellers, alert when the number drops.",
    group: "questions",
  },
  {
    slug: "notification-system",
    title: "Notification System",
    description:
      "Fan-out email / push / SMS with preferences, retries, and idempotency.",
    group: "questions",
  },
  {
    slug: "robinhood",
    title: "Robinhood",
    description:
      "Trade orders with correctness first — matching, idempotency, and market hours.",
    group: "questions",
  },
  {
    slug: "google-docs",
    title: "Google Docs",
    description:
      "Collaborative editing — OT or CRDT, presence, and conflict-free cursors.",
    group: "questions",
  },
  {
    slug: "payment-system",
    title: "Payment System",
    description:
      "Ledger, idempotent charges, webhooks, and never double-spend.",
    group: "questions",
  },
  {
    slug: "metrics-monitoring",
    title: "Metrics Monitoring",
    description:
      "Ingest time series, downsample, alert on SLOs — Prometheus-shaped thinking.",
    group: "questions",
  },
  {
    slug: "online-chess",
    title: "Online Chess",
    description:
      "Matchmaking, game rooms, clocks, and cheating-resistant move validation.",
    group: "questions",
  },
  {
    slug: "chatgpt",
    title: "ChatGPT",
    description:
      "LLM product design — sessions, streaming tokens, rate limits, and RAG.",
    group: "questions",
  }
];
