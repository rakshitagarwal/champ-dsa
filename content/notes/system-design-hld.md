# System Design — High-Level Design (HLD)

> **Goal:** Pass product/infra design interviews. Interviewers grade *problem navigation*, *working design*, *trade-offs*, and *communication* — not memorized diagrams.
>
> Structure inspired by [Hello Interview — System Design in a Hurry](https://www.hellointerview.com/learn/courses/system-design) and [Karan Pratap Singh — System Design](https://www.karanpratapsingh.com/courses/system-design). Class/module design → [LLD notes](/notes/system-design-lld).

---

## 0. Delivery framework (use every interview)

Aim for a **working system first**, then deepen. Suggested ~45 min flow:

| Step | Time | What to do |
|------|------|------------|
| **1. Requirements** | ~5 min | Top **3** functional ("users can…") + **3–5** non-functional (latency, availability, scale). Prioritize ruthlessly. |
| **2. Core entities** | ~2 min | Nouns: User, Tweet, Ride… First draft only. |
| **3. API / interface** | ~5 min | Default **REST**. Sketch 4–5 endpoints; move on. |
| **4. High-level design** | ~10–15 min | Boxes that satisfy each API. Talk data flow + what state changes. Note "cache later" without building it yet. |
| **5. Deep dives** | ~10 min | Scale NFRs, bottlenecks, edge cases. Senior = lead this; mid = expect interviewer probes. |

**Capacity math:** Skip upfront theater. Estimate **when a number changes the design** (e.g. "can this Top-K fit on one machine?").

**Phrase:** *"I'll start with a simple design that meets the functional APIs, then harden for scale and failure."*

### Non-functional checklist (pick what matters)

1. **CAP** — consistency vs availability under partition  
2. **Scale** — read-heavy vs write-heavy; bursty traffic  
3. **Latency** — which path must be &lt;200ms?  
4. **Durability** — can we lose events? (chat vs analytics)  
5. **Security / abuse** — rate limits, auth  
6. **Fault tolerance** — SPOFs, failover  

---

## 1. Core building blocks

### 1.1 Networking & APIs

| Choice | When |
|--------|------|
| **HTTP/REST** | Default external API |
| **gRPC** | Internal service-to-service, latency-sensitive |
| **WebSockets** | Bidirectional realtime (chat, live location) |
| **SSE** | Server→client push only (feeds, notifications) |
| **Long polling** | Fallback when WS hard |

**Load balancing:** L4 (TCP, fast, sticky for WS) vs L7 (HTTP path/header routing). Health checks remove bad nodes.

**Geography:** NYC↔London ≥ ~80ms RTT (physics). Global low latency → multi-region + CDN for static.

### 1.2 Caching

Full notes → [Redis, DynamoDB & search](/notes/data-stores).

**Default pattern:** Cache-aside (Redis). Read → cache → miss → DB → populate + TTL.

| Strategy | Idea |
|----------|------|
| Cache-aside | App owns reads/writes to cache |
| Read-through | Cache loads DB on miss |
| Write-through | Write cache + DB together |
| Write-behind | Write cache; async DB (fast, risk loss) |

**Hard parts:** Invalidation after writes; **stampede** when popular key expires (lock / soft TTL / singleflight). Don't cache everything — only hot, relatively stable data.

**CDN:** Images, video chunks, JS/CSS at the edge. Not a substitute for app Redis.

### 1.3 Databases

Full notes → [SQL](/notes/sql) and [DynamoDB / search](/notes/data-stores).

| | SQL (Postgres) | NoSQL (Cassandra / Dynamo / Mongo) |
|--|----------------|-------------------------------------|
| Best for | Relations, transactions, flexible queries | Huge scale, known access patterns |
| Scale | Vertical + read replicas; shard later | Horizontal by design |
| Consistency | Strong (ACID) | Often eventual / tunable |

**Start normalized relational**, denormalize hot read paths. **Index** what you filter/sort on (B-tree default; compound left-prefix).

**Replication:** Primary for writes; replicas for reads (lag!). Multi-primary needs conflict rules.

**Sharding:** Split by **shard key** (often `user_id`). Good key → single-shard queries; bad key → scatter-gather. **Consistent hashing** reduces remapping when nodes add/remove.

**CAP (practical):** Partitions happen. Pick **CP** (reject/queue writes) or **AP** (serve stale). Say which and why for *this* product.

### 1.4 Async & messaging

Full notes → [Message brokers & queues](/notes/message-brokers) (RabbitMQ, Kafka, NATS JetStream, pub/sub).

| Tool | Use |
|------|-----|
| **Queue** (SQS/Rabbit) | Work distribution, retries, buffering uploads |
| **Log/stream** (Kafka) | Ordered event log, fan-out consumers, analytics |
| **Pub/Sub** | Broadcast notifications |

**Why async:** Decouple upload from processing; absorb spikes; exactly-once is hard — design **idempotent** consumers.

### 1.5 Other interview staples

- **API Gateway** — auth, rate limit, TLS termination, protocol fan-in  
- **Rate limiting** — token bucket / sliding window in Redis; return 429  
- **Circuit breaker** — stop calling sick dependencies  
- **Object storage (S3)** — blobs; app DB stores metadata + URLs  
- **Search (Elasticsearch)** — full-text; accept slight lag via async index. Deep dive → [data stores](/notes/data-stores)  
- **SLA / SLO / SLI** — promise / target / measured (e.g. p99 latency)  

### 1.6 Numbers worth knowing (order of magnitude)

| Thing | Ballpark |
|-------|----------|
| Redis get | ~1 ms |
| Same-DC DB query | ~1–10 ms |
| Cross-region RTT | tens–hundreds ms |
| Disk seek (HDD) | ~10 ms; SSD much faster |
| 1 day seconds | ~86k ≈ 10^5 |
| QPS from daily volume | `daily / 86400` |

---

## 2. Recurring scaling patterns

### Scaling reads
Cache hot keys → read replicas → CDN for static → denormalized read models.

### Scaling writes
Shard by key → batch → async via queue → avoid hot partitions (celebrity user_id).

### Realtime
Prefer SSE/WS only when needed; sticky LB or connection registry (Redis) for presence.

### Large blobs
Client → pre-signed S3 upload; process via queue (transcode); serve via CDN.

### Multi-step workflows
Saga / outbox pattern; never dual-write DB + queue without a story for failures.

### Proximity (maps / rides)
Geohash or quadtree / geospatial index; don't full-table scan lat/long ranges.

---

## 3. Chapter V — Company designs (must-know)

These are the classic case studies from Karan's course. Memorize **requirements → estimate → API → boxes → one deep dive**.

---

### 3.1 URL Shortener (TinyURL / Bitly)

**Functional:** Create short alias; redirect; expire links.  
**Non-functional:** Highly available, low latency redirects; read-heavy (~100:1).  
**Extended:** Analytics, abuse prevention (API keys + rate limits).

**Rough scale (example):** 100M new links/month → ~40 writes/s, ~4K redirects/s; years of storage → TBs; cache ~20% hot URLs (Pareto).

**Entities:** `User`, `Url` (`hash`, `originalUrl`, `expiresAt`, `userId`).

**API:**
- `POST /urls` → short code  
- `GET /{code}` → **301/302** to long URL  
- `DELETE /urls/{code}`

**301 vs 302:** 301 caches in browsers (harder analytics); 302 keeps hits on your servers.

**Key generation:**
1. **Base62 counter / ranges** via ZooKeeper-style range allocation  
2. **Key Generation Service (KGS)** — precompute unused keys; mark used under lock  
3. Avoid naive MD5 truncation (collisions).

**Design:** Client → LB → API → (Redis) → DB. Create path asks KGS for key, writes DB+cache. Redirect: cache then DB; 404 if missing.

**Deep dives:** Shard URL table by hash; TTL cleanup (cron or lazy on access); async analytics pipeline; multi-instance KGS + replica of key store.

---

### 3.2 WhatsApp (chat)

**Functional:** 1:1 chat; groups (~100); media share.  
**NFR:** Low latency, high availability, scale.  
**Extended:** Delivery/read receipts; last seen; push when offline.

**Rough scale (example):** 50M DAU × ~40 msgs → ~2B msgs/day (~24K RPS); media ~5% → huge object storage.

**Entities:** `User`, `Chat`, `Group`, `Message`, membership maps.

**API (sketch):** `getChats`, `getMessages(channelId)`, `sendMessage`, `join/leaveGroup`.

**Architecture:**
- **User service** (HTTP/auth)  
- **Chat service** — **WebSockets** for online messaging; connection map in Redis  
- **Presence** — heartbeat / last activity → Redis  
- **Media** — S3 + CDN; compress  
- **Notifications** — if offline, enqueue → FCM/APNS  

**Realtime:** Prefer **push (WS)** over pull/long-poll (wastes RPS).

**Receipts:** Client ACK → `deliveredAt`; open chat → `seenAt`.

**Deep dives:** Shard messages by `chatId`; cache recent history + paginate; Kafka for notification durability; don't put all protocols on separate LBs — API gateway helps.

---

### 3.3 Twitter / X (feed)

**Functional:** Post tweet; follow; home timeline; search.  
> NFR: Availability + scale (read-heavy); feed latency.  
**Extended:** Retweet, likes, trends, analytics.

**Rough scale (example):** 200M DAU × 5 tweets → 1B tweets/day (~12K write RPS) + much higher read RPS on timelines; media storage dominates.

**Entities:** `User`, `Tweet`, `Follow`, `Feed` (materialized).

**API:** `POST /tweets`, `POST /follows`, `GET /feed`, search endpoint.

**Feed generation vs publishing:**
| Model | Idea | Pros | Cons |
|-------|------|------|------|
| **Fan-out on read (pull)** | Merge follows' tweets at read | Cheap writes | Slow/expensive reads |
| **Fan-out on write (push)** | On tweet, write into each follower's feed cache | Fast reads | Celebrity write storm |
| **Hybrid** | Push for normal users; pull for celebrities | Best practical | More complexity |

**Ranking:** Relevance × engagement × time decay (classic EdgeRank intuition); modern systems use ML.

**Search / trends:** Elasticsearch; cache hot queries / hashtags for "trending".

**Deep dives:** Precompute feeds into Redis; Kafka → analytics; CDN for media; graph DB optional for mutuals.

---

### 3.4 Netflix (video streaming)

**Functional:** Upload/process content; stream; search; comments (YT-like optional).  
**NFR:** High availability, durable uploads, scalable delivery.  
**Extended:** Geo-blocking; resume playback; recommendations; analytics.

**Rough scale:** Extremely read-heavy streaming; uploads smaller count but huge bytes (transcoding pipeline).

**Entities:** `User`, `Video` (metadata + stream URLs), `Tag`, `View` (offset), `Comment`.

**API:** `uploadVideo`, `streamVideo(codec, resolution, offset)`, `search`, `comment`.

**Upload pipeline (async queue):**
1. **Chunk** file (Netflix-style scene chunks help UX)  
2. **Content policy / copyright** checks (ML + human DLQ)  
3. **Transcode** (FFmpeg / MediaConvert)  
4. **Ladder** of resolutions (4K→360p)  
5. Store in object storage; metadata in DB  

**Playback:** CDN / Open-Connect-like edge; **HLS / DASH** adaptive bitrate; resume via stored `offset`.

**Geo-block:** IP / profile region + CDN geo restrictions.

**Recommendations:** Collaborative filtering / viewing history features (don't invent Netflix's full ML stack in interview — name signals).

**Deep dives:** Never block upload API on transcode; search via ES; share links via shortener service.

---

### 3.5 Uber (ride hailing)

**Functional (customer):** See nearby cabs + ETA/price; book; track driver.  
**Functional (driver):** Accept/deny; navigate to pickup; complete trip.  
**NFR:** Reliable matching, low latency location, scale.  
**Extended:** Ratings, payments, analytics, surge.

**Rough scale (example):** 100M DAU, ~10M rides/day, ~12K RPS overall actions.

**Entities:** `Customer`, `Driver`, `Cab`, `Trip`, `Payment`, `Rating`.

**API:** `requestRide`, `cancelRide`, `accept/deny`, `start/endTrip`, `rateTrip`.

**Flow:** Request → find nearby drivers + ETA → notify drivers → accept → live track → complete → pay → rate.

**Location:** WebSockets (or frequent GPS updates); background location on mobile.

**Nearby search:**
- Naive SQL `BETWEEN` on lat/long — **not scalable**  
- **Geohash** — encode lat/long; compare prefixes  
- **Quadtree** — partition space; update as drivers move; cache in Redis  

**Matching:** Mutex/transaction around offer to avoid double-assign; rank drivers (rating, ETA).

**Payments:** Prefer Stripe/PayPal + webhooks; keep payment service separate.

**Surge:** Raise price when demand >> supply in a geocell.

**Deep dives:** Shard by region; Kafka notifications; never lose trip state (durable trip service).

---

## 4. Interview checklist

- [ ] Top 3 functional + clear NFRs (with numbers where useful)  
- [ ] Entities + 4–5 APIs  
- [ ] End-to-end path for the **main** use case drawn  
- [ ] Storage choice justified (SQL vs NoSQL)  
- [ ] One scaling story (cache / shard / queue / CDN)  
- [ ] One failure story (retry, DLQ, multi-AZ)  
- [ ] Didn't boil the ocean — scoped v1  

**Next:** Module/class design → [LLD notes](/notes/system-design-lld). Messaging → [Message brokers](/notes/message-brokers). Redis / Dynamo / ES → [Data stores](/notes/data-stores). Shipping → [Docker, CI/CD & production](/notes/advanced-topics).

**Sources to revisit:** [karanpratapsingh.com/courses/system-design](https://www.karanpratapsingh.com/courses/system-design) (Ch I–V), [hellointerview.com system design](https://www.hellointerview.com/learn/courses/system-design) (delivery + core concepts + patterns).
