# News Aggregator

> Google News / Apple News lite. Ingest many publishers, **dedupe stories**, rank a feed. Crawling is a means, not the product.

> Polite crawl → canonicalize → cluster (SimHash) → rank → **precomputed feed** per topic; user request never crawls the web.

## What they ask

**Scenario:** Pull from ~1k–10k publishers, cluster near-duplicates ("same earthquake, 40 headlines"), serve ranked/personalized feed in **<200ms**. Same wire story, 50 different titles — be polite, dedupe, rank; don't fan-out to 1k publishers on every `GET /feed`.

**What the interviewer really tests:**
- Polite ingest ([web crawler](/hld/web-crawler), robots.txt, backoff)
- Canonicalization + near-duplicate clustering
- Ranking without per-request fan-out
- Freshness vs load; copyright/snippet policy

## Requirements

**Functional:** Ingest (RSS, sitemap, HTML, webhook). Dedupe + cluster into stories. Rank feed by topic; pagination. Story detail with sources. Optional search, breaking push.

**Non-functional:** Tier-1 freshness <2 min; long tail <15 min; per-host rate limit; feed available if crawler lags; millions of articles.

**Clarify:** Personalization vs global? Link-out vs host full text? Languages? Paywalls? Push for breaking?

**Out of scope (v1):** Full NLP summarization, comments/social, publisher CMS, real-time CF training.

## Scale estimation

| Metric | Result |
|--------|--------|
| Ingest | ~50k articles/day; ~1–5 fetches/s avg, **1 req/s max per host** |
| Raw HTML | ~1.5 GB/day → S3 (~45 GB/mo) |
| Serve | ~580 rps avg, ~3k peak — **CDN + Redis feed** |
| Feed payload | ~10 KB/response → cache-friendly |

Ingest is politeness-limited; serve is precomputed.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/v1/feed?topic=&cursor=&limit=` | Ranked story feed |
| `GET` | `/api/v1/stories/{clusterId}` | Cluster + source list |
| `GET` | `/api/v1/topics` | Topic list |
| `GET` | `/api/v1/search?q=` | Search ([Elasticsearch](/hld/nosql-databases)) |
| `POST` | `/internal/ingest/webhook` | Publisher push |

**Feed response:** `{ stories: [{ clusterId, title, summary, sourceCount, topSources, publishedAt, score }], nextCursor }`. Cursor = opaque `score+clusterId`.

## High-Level Design (HLD)

![News aggregator: ingest, cluster, rank, feed API](/images/hld/news-aggregator-architecture.svg)

- **Crawler fleet:** per-host token bucket (~1 rps); robots.txt; tier-1 every 60s, long tail 15 min; ETag/304.
- **Parser:** JSON-LD/OpenGraph + site adapters; raw HTML → S3.
- **Canonicalizer:** strip UTM, normalize URL; content hash / SimHash.
- **Clustering:** block by time window + topic/geo → MinHash similarity → attach to cluster.
- **Ranking:** recency × authority × engagement; user topic weights in [Redis](/hld/caching-strategies).
- **Materializer (30–60s):** rebuild `feed:topic:{x}` ZSET → Redis + [CDN](/hld/cdn).
- **API:** read precomputed list only; personalize = rerank top 100 in memory.
- **Kafka:** fetch → parse → cluster → rank pipeline.

**Ingest:** fetch → S3 → parse → dedup UNIQUE → cluster → upsert → rank update.

**Read:** `ZRANGE feed:topic:world` → hydrate cluster hash → return.

## Deep dive — clustering and politeness

Exact hash misses paraphrases. **Block** by 2h + topic/geo; MinHash Jaccard ~0.82–0.85; first article creates cluster, others attach. Embeddings (v2) for cross-language.

Politeness: 429 → exponential backoff; deprioritize host; WebSub/RSS push when available. Measure `published_at → materialized_at` lag.

## Deep dive — ranking and legal

`score ≈ recency_decay + authority + engagement + diversity`. Personalize: `0.7×global + 0.3×user topic weights` on top 100 — don't hide breaking news.

**Legal:** snippets only, link out; respect paywall robots; don't bypass. Images: cache with publisher policy.

## Failures and scale

- Crawler banned: backoff, RSS-only fallback; never hammer.
- Parser fail: keep S3 raw; generic fallback; alert spike.
- Clustering down: Kafka backlog; serve stale Redis/CDN feed.
- Materializer lag: versioned feed keys; atomic cutover.
- Breaking spike: priority lane tier-1; shed long tail.
- Scale: shard crawlers by domain hash; scale parser consumers; CDN 60s TTL on global feed.

**Phrase:** Polite ingest, canonicalize URLs, cluster near-duplicates, and serve a precomputed topic feed. The user request never crawls the web.

**Remember:** Per-host 1 rps → SimHash blocks → materialized Redis ZSET → GET /feed never hits crawlers → snippets not full text.
