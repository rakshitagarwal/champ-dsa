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
      "CAP ka bada bhai — partition me CA, else me Latency vs Consistency.",
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
    slug: "sharding",
    title: "Sharding",
    description:
      "Split one DB into N — hash, range, geo, and the cross-shard pain.",
    group: "concepts",
  },
  {
    slug: "partitioning",
    title: "Partitioning",
    description:
      "Divide data by key — range vs hash vs geo, and hot partition fix.",
    group: "concepts",
  },
  {
    slug: "replication",
    title: "Replication",
    description:
      "Copy data to many nodes — leader-follower, quorum, and lag trade-offs.",
    group: "concepts",
  },
  {
    slug: "quorum",
    title: "Quorum",
    description:
      "R+W>N for strong read — tunable consistency with W and R.",
    group: "concepts",
  },
  {
    slug: "bloom-filter",
    title: "Bloom Filter",
    description:
      "Probabilistic set — No is definite, Yes is maybe — guard DB at 1% false positive.",
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
    slug: "database-indexing",
    title: "Database Indexing",
    description:
      "B-tree, LSM, hash — how indexes make reads fast and writes slower.",
    group: "concepts",
  },
  {
    slug: "thundering-herd",
    title: "Thundering Herd",
    description:
      "Stampede on expiry — singleflight, jitter, and stale-while-revalidate.",
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
    slug: "leader-election",
    title: "Leader Election",
    description:
      "Pick one leader — ZooKeeper, Raft, and lease with fencing.",
    group: "concepts",
  },
  {
    slug: "idempotency",
    title: "Idempotency",
    description:
      "Same request twice gives same result — keys, dedup, and exactly-once.",
    group: "concepts",
  },
  {
    slug: "backpressure",
    title: "Backpressure",
    description:
      "Consumer slow to producer ko slow karo — queue, drop, or throttle.",
    group: "concepts",
  },
  {
    slug: "vector-clocks",
    title: "Vector Clocks",
    description:
      "Track causality without global clock — Dynamo and CRDTs use it.",
    group: "concepts",
  },
  {
    slug: "eventual-consistency",
    title: "Eventual Consistency",
    description:
      "Writes propagate async — read may be stale, but converges.",
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
    slug: "service-discovery",
    title: "Service Discovery",
    description:
      "Find healthy instances — DNS, registry, and health checks.",
    group: "concepts",
  },
  {
    slug: "gossip-protocol",
    title: "Gossip Protocol",
    description:
      "Epidemic spread for membership and failure detection — Cassandra uses it.",
    group: "concepts",
  },
  {
    slug: "horizontal-scaling",
    title: "Horizontal vs Vertical Scaling",
    description:
      "Scale up vs scale out — when to add bigger box vs more boxes.",
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
    slug: "microservices",
    title: "Microservices vs Monolith",
    description:
      "One deploy vs many services — trade-offs, boundaries, and comms.",
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
    slug: "message-queue",
    title: "Message Queue",
    description:
      "Decouple with queues — SQS, RabbitMQ, Kafka, and backpressure handling.",
    group: "concepts",
  },
  {
    slug: "observability",
    title: "Observability",
    description:
      "Logs, metrics, traces — see inside, alert, and debug at scale.",
    group: "concepts",
  },

  {
    slug: "bitly",
    title: "Bitly",
    description: "URL shortener — generate a short code, redirect fast, survive read-heavy traffic.",
    group: "questions",
  },
  {
    slug: "dropbox",
    title: "Dropbox",
    description: "File storage and sync — chunk uploads, metadata, and conflict handling.",
    group: "questions",
  },
  {
    slug: "local-delivery",
    title: "Local Delivery Service",
    description: "Match nearby couriers to orders, track live location, and keep ETAs honest.",
    group: "questions",
  },
  {
    slug: "ticketmaster",
    title: "Ticketmaster",
    description: "Inventory under flash sales — hold seats, avoid double-booking, survive spikes.",
    group: "questions",
  },
  {
    slug: "fb-news-feed",
    title: "FB News Feed",
    description: "Fan-out timelines, rank posts, and keep the home feed fast at celebrity scale.",
    group: "questions",
  },
  {
    slug: "tinder",
    title: "Tinder",
    description: "Geo matching, swipe queues, and a recommendation stack that stays cheap.",
    group: "questions",
  },
  {
    slug: "leetcode",
    title: "LeetCode",
    description: "Online judge — isolate untrusted code, grade tests, and queue submissions.",
    group: "questions",
  },
  {
    slug: "whatsapp",
    title: "WhatsApp",
    description: "1:1 and group chat — WebSockets, receipts, media, and offline push.",
    group: "questions",
  },
  {
    slug: "rate-limiter",
    title: "Rate Limiter",
    description: "Protect APIs with token buckets / sliding windows across many servers.",
    group: "questions",
  },
  {
    slug: "youtube",
    title: "YouTube",
    description: "Upload, transcode, adaptive stream, and CDN the bytes — metadata stays in a DB.",
    group: "questions",
  },
  {
    slug: "fb-live-comments",
    title: "FB Live Comments",
    description: "Realtime comments on a live video without melting a single chat server.",
    group: "questions",
  },
  {
    slug: "youtube-top-k",
    title: "YouTube Top K",
    description: "Trending / top videos — count views at scale and keep a cheap Top-K.",
    group: "questions",
  },
  {
    slug: "uber",
    title: "Uber",
    description: "Ride matching with live location, geohash nearby search, and trip state.",
    group: "questions",
  },
  {
    slug: "web-crawler",
    title: "Web Crawler",
    description: "Polite BFS of the web: URL frontier, robots.txt, dedup, and storage.",
    group: "questions",
  },
  {
    slug: "ad-click-aggregator",
    title: "Ad Click Aggregator",
    description: "Ingest huge click streams, count with late events, and bill advertisers.",
    group: "questions",
  },
  {
    slug: "fb-post-search",
    title: "FB Post Search",
    description: "Search friends' posts with privacy filters — not a naive Elasticsearch dump.",
    group: "questions",
  },
  {
    slug: "yelp",
    title: "Yelp",
    description: "Local business search: geo + text + ratings, with hot city caches.",
    group: "questions",
  },
  {
    slug: "instagram",
    title: "Instagram",
    description: "Photo feed, follows, and fan-out — similar to news feed with heavier media.",
    group: "questions",
  },
  {
    slug: "strava",
    title: "Strava",
    description: "Activity tracking, GPS traces, segments, and a social feed of workouts.",
    group: "questions",
  },
  {
    slug: "distributed-cache",
    title: "Distributed Cache",
    description: "Cache-aside, consistent hashing, stampede, and what happens when Redis dies.",
    group: "questions",
  },
  {
    slug: "online-auction",
    title: "Online Auction",
    description: "Bids in the last seconds — consistency of the winning bid vs throughput.",
    group: "questions",
  },
  {
    slug: "job-scheduler",
    title: "Job Scheduler",
    description: "Cron at scale: durable jobs, workers, retries, and no double-run.",
    group: "questions",
  },
  {
    slug: "news-aggregator",
    title: "News Aggregator",
    description: "Ingest publishers, dedupe stories, rank a personalized newspaper.",
    group: "questions",
  },
  {
    slug: "price-tracking",
    title: "Price Tracking Service",
    description: "Watch product prices, scrape/poll sellers, alert when the number drops.",
    group: "questions",
  },
  {
    slug: "notification-system",
    title: "Notification System",
    description: "Fan-out email / push / SMS with preferences, retries, and idempotency.",
    group: "questions",
  },
  {
    slug: "robinhood",
    title: "Robinhood",
    description: "Trade orders with correctness first — matching, idempotency, and market hours.",
    group: "questions",
  },
  {
    slug: "google-docs",
    title: "Google Docs",
    description: "Collaborative editing — OT or CRDT, presence, and conflict-free cursors.",
    group: "questions",
  },
  {
    slug: "payment-system",
    title: "Payment System",
    description: "Ledger, idempotent charges, webhooks, and never double-spend.",
    group: "questions",
  },
  {
    slug: "metrics-monitoring",
    title: "Metrics Monitoring",
    description: "Ingest time series, downsample, alert on SLOs — Prometheus-shaped thinking.",
    group: "questions",
  },
  {
    slug: "online-chess",
    title: "Online Chess",
    description: "Matchmaking, game rooms, clocks, and cheating-resistant move validation.",
    group: "questions",
  },
  {
    slug: "chatgpt",
    title: "ChatGPT",
    description: "LLM product design — sessions, streaming tokens, rate limits, and RAG.",
    group: "questions",
  },
];
