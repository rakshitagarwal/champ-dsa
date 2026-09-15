# Capacity Estimation

> Back-of-the-envelope math that decides boxes — do it only when the number changes the design.

> Capacity estimation converts product numbers (users, messages, photos) into engineering numbers (QPS, storage, bandwidth). Interviewers don't want precision; they want to see which numbers force which decisions — a Top-K that fits one machine needs no distributed counter.

## The Core Metrics

- **QPS / RPS** — queries or requests per second. Daily count divided by 86400 gives average; multiply by 2-3 for peak.
- **DAU / MAU** — daily and monthly active users; size everything from DAU, not registered users.
- **Read vs Write Ratio** — read-heavy (100:1, social feeds) caches aggressively; write-heavy (IoT, clicks) needs ingest pipelines.
- **Peak Traffic** — average lies; design for peak (launches, evenings, flash sales).

## Storage Estimation

Multiply count by size by retention. 500M users posting 30 messages a day at 300 bytes: 500M × 30 × 300 bytes ≈ 4.5 TB per day, ~1.6 PB per year. That single line kills single-node Postgres and mandates Cassandra or DynamoDB. Media dominates bytes — 10% of messages with 1 MB photos is ~147 TB per day, which belongs on object storage, never in a database.

## Bandwidth Estimation

Bytes per second in and out. 173K messages per second at 500 bytes with overhead is ~86 MB/s — trivial for messages, while media bandwidth in terabytes per second forces CDN offload. Bandwidth decides CDN usage; storage decides database choice.

## Worked Example — WhatsApp-like Chat

Assume 500M DAU, 30 messages per user per day, 20% in groups.

| Metric | Math | Result |
|---|---|---|
| Message QPS | 500M × 30 / 86400 | ~173K avg, ~350K peak |
| Text storage | 173K × 300 bytes | ~4.5 TB/day → 1.6 PB/year |
| Media storage | 10% × 1 MB photos | ~147 TB/day → object storage |
| Connections | 10% concurrent | ~50M sockets → sharded WS fleet |

Key insight: message count is high but each message is tiny — optimize for write throughput and fan-out, not payload size.

## Keep in mind

- DAU drives everything; registered users mean nothing.
- Average QPS × 2-3 gives peak — design for peak.
- One storage line can kill a database choice — compute it early.
- Media bytes dwarf text bytes — offload to object storage plus CDN.
- Estimate only when the number changes boxes — Top-K on one machine needs no cluster.
