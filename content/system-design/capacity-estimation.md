# Capacity Estimation

> Back-of-the-envelope math that decides boxes — do it only when the number changes the design.

> Capacity estimation converts product numbers (users, messages, photos) into engineering numbers (QPS, storage, bandwidth). Interviewers don't want precision; they want to see which numbers force which decisions — a Top-K that fits one machine needs no distributed counter.

## The Core Metrics

Start from product assumptions and derive **QPS**, **storage**, and **bandwidth** — round aggressively (powers of two and ten are fine). Average daily activity spread over 86,400 seconds gives baseline QPS; real systems see **2–3× peak** during evenings, launches, or regional work hours. Size from **DAU**, not registered users — most accounts are dormant. Read/write ratio tells you whether to spend interview time on **cache and replicas** (read-heavy) or **write pipelines, partitioning, and WAL** (write-heavy).

- **QPS / RPS** — queries or requests per second. Daily count divided by 86400 gives average; multiply by 2-3 for peak.
- **DAU / MAU** — daily and monthly active users; size everything from DAU, not registered users.
- **Read vs Write Ratio** — read-heavy (100:1, social feeds) caches aggressively; write-heavy (IoT, clicks) needs ingest pipelines.
- **Peak Traffic** — average lies; design for peak (launches, evenings, flash sales).

- State assumptions aloud: "500M DAU, 30 actions/day" — interviewers can correct you.
- **Peak QPS** ≈ (daily events / 86400) × peak factor; use 2× minimum for consumer apps.
- **MAU/DAU** ratio hints stickiness; low DAU/MAU means burstier marketing traffic.
- Separate **API QPS** from **background jobs** (fan-out, indexing) — both need capacity.
- If peak QPS < ~1–2K on one core, a single service may suffice; above that, plan sharding or pools.

## Storage Estimation

Storage is **objects × size × retention**. Text metadata is cheap until volume explodes; photos and video dominate bytes and belong on **object storage (S3)** with lifecycle rules, not in row stores. Compute **daily ingest** and **total retained** — compliance may require 7 years of logs while messages expire in 90 days. One back-of-envelope line often eliminates a technology: multi-TB per day on a single Postgres primary is the wrong tool; Cassandra, DynamoDB, or sharded SQL fits better.

Multiply count by size by retention. 500M users posting 30 messages a day at 300 bytes: 500M × 30 × 300 bytes ≈ 4.5 TB per day, ~1.6 PB per year. That single line kills single-node Postgres and mandates Cassandra or DynamoDB. Media dominates bytes — 10% of messages with 1 MB photos is ~147 TB per day, which belongs on object storage, never in a database.

- Include **overhead**: indexes, replicas, and metadata often add **2–3×** raw payload.
- **Hot vs cold** tiers — recent data on SSD/Redis; archives to cheaper storage.
- **Replication factor** multiplies disk (3× for triple replica).
- Estimate **growth** for 3–5 years if the prompt implies longevity.
- Call out **delete/compaction** — append-only logs need compaction CPU and disk headroom.

## Bandwidth Estimation

Bandwidth is bytes in flight per second at the **edge** and between tiers. Multiply QPS by average response size for egress; add **fan-out** (one write → N push notifications) for internal links. Text APIs rarely bottleneck NICs; image and video feeds do — that's when you **CDN**, **compress**, and **resize at upload**. Ingress (uploads) matters for live video and backup products; egress dominates for feed and streaming.

Bytes per second in and out. 173K messages per second at 500 bytes with overhead is ~86 MB/s — trivial for messages, while media bandwidth in terabytes per second forces CDN offload. Bandwidth decides CDN usage; storage decides database choice.

- **Egress** = QPS × payload; add **TLS and HTTP overhead** (~5–10%) in rough calcs.
- **CDN** shifts egress cost and latency — cache hit ratio is the lever (80%+ for static).
- **Cross-AZ/cross-region** replication doubles internal bandwidth — price it for multi-region designs.
- **WebSocket** sustained connections imply **keepalive traffic**, not just message bursts.
- If bandwidth > ~1 Gbps sustained at origin, assume **CDN or edge** in the diagram.

## Worked Example — WhatsApp-like Chat

Walk the interviewer through one coherent scenario: users, actions per day, peak factor, then table rows for QPS, storage, and connections. Chat is **write-heavy** with small payloads but huge connection counts — optimize **write throughput, partitioning by chat/user, and push fan-out**, not JSON size. Media is a separate path: metadata in DB, blobs in object storage, thumbnails via CDN.

Assume 500M DAU, 30 messages per user per day, 20% in groups.

| Metric | Math | Result |
|---|---|---|
| Message QPS | 500M × 30 / 86400 | ~173K avg, ~350K peak |
| Text storage | 173K × 300 bytes | ~4.5 TB/day → 1.6 PB/year |
| Media storage | 10% × 1 MB photos | ~147 TB/day → object storage |
| Connections | 10% concurrent | ~50M sockets → sharded WS fleet |

Key insight: message count is high but each message is tiny — optimize for write throughput and fan-out, not payload size.

- **Message QPS** drives **partition keys** (user_id, chat_id) and async pipelines for search/index.
- **50M concurrent sockets** → **many gateway nodes**, sticky or user-sharded routing, regional clusters.
- **Group messages** multiply fan-out — one write can become N push deliveries (cap or batch).
- **Text DB** choice: wide-column or sharded SQL; **never** store 147 TB/day of images in rows.
- Mention **offline sync** and **read receipts** only if they change QPS or storage — otherwise defer.

## Keep in mind

- DAU drives everything; registered users mean nothing unless the prompt says otherwise.
- Average QPS × 2–3 gives peak — design for peak, especially for global consumer products.
- One storage line can kill a database choice — compute it before picking Postgres vs Cassandra.
- Media bytes dwarf text bytes — offload to object storage plus CDN; keep pointers in DB.
- Estimate only when the number changes boxes — Top-K on one machine needs no cluster.
- Say rounding aloud and invite correction — collaboration beats false precision.
