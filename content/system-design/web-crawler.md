# Web Crawler

> Download the web politely. The core is a **URL frontier + dedup + robots.txt**, not a recursive `wget` on one box.

> URL frontier (queue), per-domain politeness, dedup via Bloom/set; fetcher → parser → dedup → store in S3 + index.

## What they ask

"Design Googlebot — seeds, billions of pages, feed search index." Avoid DDoSing hosts, infinite URL traps, infinite re-crawl.

**Tests:** Distributed frontier; per-host politeness + robots; canonicalization + Bloom dedup; decouple fetch/parse/index via [Kafka](/hld/message-queue).

**Scale anchor:** Target ~1B pages; ~5–10k fetches/s polite aggregate; frontier billions of URLs on disk.

## Requirements

**Functional:**
- Seed URLs (incl. sitemaps); extract links; enqueue unseen canonical URLs.
- HTTP fetch with redirect cap, retries, size/time limits; respect `robots.txt`, `noindex`, `Crawl-delay`.
- Canonicalize URLs; URL + content dedup; store raw pages to [S3](/hld/storage).
- Emit parsed docs to search indexer ([Elasticsearch](/hld/nosql-databases)); recrawl by freshness/change hints.

**Non-functional:**
- Polite per-host rate (e.g. ≤1–2 req/s/domain) with massive inter-host parallelism.
- Idempotent fetch (lease + visibility timeout); crash-safe frontier.
- Operate within bandwidth/DNS budgets; identifiable crawler agent.

**Clarify:** Whole web vs focused vertical? JS rendering (defer headless queue)? Max depth / URLs per host?

**Out of scope (v1):** Headless render farm, search ranking, image/video processing beyond store.

## Scale estimation

| Dimension | Assumption | Result |
|-----------|-----------|--------|
| Corpus | 1B pages target | S3 + index downstream |
| Fetch rate | 5k pages/s | ~432M pages/day |
| Bandwidth | ~30 KB/page gzipped | ~150 MB/s sustained (~1.2 Gbps) |
| Raw storage | 30 KB × 1B | ~30 TB (lifecycle to Glacier) |
| Frontier | 10B pending URLs × ~100B | ~1 TB metadata — disk queue |
| Dedup seen-set | 10B URLs | Bloom ~12 GB @1% FPR + Cassandra exact |
| DNS | 5k fetches/s, 90% cache hit | ~500 uncached lookups/s |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/seeds` | Bootstrap URLs |
| `GET` | `/v1/status` | Frontier depth, fetch RPS |
| `POST` | `/v1/crawl/pause` | Pause domain |

Steady state: workers use [Kafka](/hld/message-queue) topics, not REST.

**Non-functional:** Identify via `User-Agent`; cap body size (~2MB) and fetch timeout (~10s); follow ≤5 redirects.

## High-Level Design (HLD)

![Web crawler architecture: frontier, fetchers, dedup, store](/images/hld/web-crawler-architecture.svg)

```
Seeds → Frontier (priority, sharded by host) → Scheduler (per-host token bucket + robots cache)
  → Fetcher workers (DNS cache, HTTP caps) → S3 raw + Parser → Canonicalizer → Dedup (Bloom → exact)
  → re-enqueue links + Index pipeline → Elasticsearch
```

**Politeness:** Host-sharded frontier; [rate limiter](/hld/rate-limiter) token bucket per domain; `Crawl-delay` from robots cache (24h TTL). **Dedup:** Canonical hash → Bloom → Cassandra `seen_urls`. **Content dedup:** SHA256 body; optional SimHash for near-dup. **Recrawl:** Priority = importance / time-since-fetch × observed change rate; respect ETag/304.

## Deep dive — traps and canonicalization

Infinite calendars/facets: depth cap, URLs/host cap, pattern detection. Normalize `http/https`, `www`, UTM params, fragments; prefer `<link rel=canonical>`. Fail closed if robots.txt fetch fails.

## Deep dive — recrawl and failures

Lease URLs on dequeue (visibility timeout); crash → re-enqueue. Backoff on 429/503 with `Retry-After`; tombstone 404. Frontier checkpointed to disk; fetchers stateless.

## Handling failures and scale

- **Fetcher crash mid-fetch:** URL lease expires → re-enqueue (at-least-once; dedup makes safe).
- **Host 429/503:** Honor `Retry-After`; exponential backoff per `host_state`.
- **Robots fetch fails:** Fail closed — do not crawl until rules cached.
- **S3/Kafka stall:** Backpressure; bounded local spill; pause scheduler vs OOM.
- **Bloom false positive:** Exact Cassandra check on positive only.
- **Loop detection:** Alert if frontier depth grows >10%/hr for a host pattern.
- **Scale:** More fetcher pods + frontier shards; HTTP keep-alive per host; consistent hash on host shards.

**Phrase:** A frontier of canonical URLs, fetchers sharded by host with robots and rate limits, and a seen-set so we don't loop. HTML in S3; links go back to the queue.

**Remember:** Politeness is per-host serialism + many hosts parallel; robots before fetch; dedup before enqueue.
