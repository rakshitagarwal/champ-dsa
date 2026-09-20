import type { SdDocumentMeta, SdGroup } from "@/types/system-design";

export const SD_GROUPS: SdGroup[] = [
  { id: "intro", title: "Start here" },
  { id: "foundations", title: "Foundations" },
  { id: "network", title: "Networking & APIs" },
  { id: "traffic", title: "Traffic & CDN" },
  { id: "data", title: "Databases" },
  { id: "caching", title: "Caching" },
  { id: "messaging", title: "Messaging & Streaming" },
  { id: "distributed", title: "Distributed Systems" },
  { id: "resilience", title: "Resilience" },
  { id: "storage", title: "Storage" },
  { id: "architecture", title: "Architecture" },
  { id: "security", title: "Security" },
  { id: "observability", title: "Observability" },
  { id: "cloud", title: "Cloud" },
  { id: "questions", title: "Question Breakdowns" },
];

export const SD_CATALOG: SdDocumentMeta[] = [
  {
    slug: "introduction",
    title: "Introduction",
    description:
      "How to study HLD — roadmap, blank interview checklist, theory map, and design aliases.",
    group: "intro",
  },

  {
    slug: "fundamentals",
    title: "System Design Fundamentals",
    description:
      "Functional vs non-functional requirements, scalability, availability, consistency and the core trade-offs.",
    group: "foundations",
  },
  {
    slug: "capacity-estimation",
    title: "Capacity Estimation",
    description:
      "QPS, DAU, storage and bandwidth math — back-of-the-envelope calculations with a worked example.",
    group: "foundations",
  },
  {
    slug: "networking",
    title: "Networking",
    description:
      "HTTP versions, TCP vs UDP, DNS, TLS, WebSockets, SSE, REST, gRPC and connection reuse.",
    group: "network",
  },
  {
    slug: "api-design",
    title: "API Design",
    description:
      "REST design, versioning, pagination, gateway, validation, errors, idempotency and webhooks.",
    group: "network",
  },
  {
    slug: "load-balancing",
    title: "Load Balancing",
    description:
      "L4 vs L7, algorithms, consistent hashing, health checks, failover and sticky sessions.",
    group: "traffic",
  },
  {
    slug: "sql-databases",
    title: "SQL Databases",
    description:
      "Postgres as default, indexes, transactions, sharding, and ClickHouse for analytics.",
    group: "data",
  },
  {
    slug: "nosql-databases",
    title: "NoSQL Databases",
    description:
      "DynamoDB, MongoDB, Cassandra deep-dives, Elasticsearch for search, modeling and consistency.",
    group: "data",
  },
  {
    slug: "caching-strategies",
    title: "Caching",
    description:
      "Cache patterns, TTL, eviction, stampede, Redis deep-dive and Bloom filters.",
    group: "caching",
  },
  {
    slug: "message-queue",
    title: "Message Queues",
    description:
      "Delivery guarantees, ordering, retries, DLQ, Kafka/RabbitMQ/NATS deep-dives and Flink.",
    group: "messaging",
  },
  {
    slug: "distributed-systems",
    title: "Distributed Systems",
    description:
      "CAP, quorum, replication, locks, ZooKeeper coordination, sagas and retries.",
    group: "distributed",
  },
  {
    slug: "microservices",
    title: "Microservices",
    description:
      "Monolith to microservices, boundaries, discovery, sync vs async, saga, outbox, CQRS and tracing.",
    group: "architecture",
  },
  {
    slug: "cdn",
    title: "CDN",
    description:
      "Edge locations, origin, static caching, cache-control, invalidation and providers.",
    group: "traffic",
  },
  {
    slug: "storage",
    title: "Storage",
    description:
      "Object, block and file storage, S3, presigned URLs, multipart upload and lifecycle.",
    group: "storage",
  },
  {
    slug: "rate-limiting",
    title: "Rate Limiting",
    description:
      "Fixed and sliding windows, token and leaky buckets, distributed limits with Redis.",
    group: "resilience",
  },
  {
    slug: "reliability-fault-tolerance",
    title: "Reliability & Fault Tolerance",
    description:
      "Health checks, retries, timeouts, circuit breaker, bulkhead, failover and RPO/RTO.",
    group: "resilience",
  },
  {
    slug: "security",
    title: "Security",
    description:
      "AuthN vs AuthZ, JWT, OAuth 2.0, RBAC, encryption, CORS/CSRF/XSS/SQL injection and secrets.",
    group: "security",
  },
  {
    slug: "observability",
    title: "Observability",
    description:
      "Logs, metrics, traces, correlation IDs, alerting, Prometheus and Grafana.",
    group: "observability",
  },
  {
    slug: "cloud-architecture",
    title: "Cloud Architecture",
    description:
      "EC2, ECS/EKS, Lambda, RDS, DynamoDB, ElastiCache, SQS/SNS, CloudFront, Route 53, ALB and CloudWatch.",
    group: "cloud",
  },
  {
    slug: "architecture-concepts",
    title: "Important Architecture Concepts",
    description:
      "Reverse proxy, service mesh, webhooks, polling vs push, batch vs stream, schedulers and geo indexing.",
    group: "architecture",
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
