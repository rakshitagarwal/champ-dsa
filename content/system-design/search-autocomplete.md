# Search Autocomplete

> Typeahead / search suggestions. The hard parts are **prefix lookup latency**, **top-K ranking**, and **keeping the index fresh** under query spam.

> Serve prefixes from a trie or Elasticsearch completion index, cache hot prefixes in Redis, rank by frequency (and personalization later). Update top-K offline from query logs.

## What they ask

**Scenario:** As user types `ama`, show `amazon`, `amazon prime`, … in ~50–100ms.

**Tests:** Prefix structure (trie vs ES completion)? Top-K per prefix without global scan? Hot prefix cache? Personalization, typos, scraping abuse?

**Scale:** 100M DAU, ~20k search QPS avg, 100k peak; ~5 suggest calls per query; 10M+ phrases.

## Requirements

**Functional (≤6):** `suggest?q=&limit=` ranked results; optional locale/personalization; offline log ingest for frequencies.

**Non-functional:** p99 < 100ms; degrade to static popular list; ranking fresh within minutes–hours; eventual order OK.

**Clarify (≤4):** Fuzzy/typo? Personalized? Multi-language? Safe-search?

**Out of scope (v1):** Full SERP, ads bidding.

## Scale estimation

| Metric | Result |
|--------|--------|
| Suggest QPS | Up to ~100k/s peak (keystrokes × searches) |
| Payload | Tiny — CPU/index bound |
| Traffic shape | Zipf head — Redis for `a`, `am`, … |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/suggest` | Prefix suggestions |
| `POST` | `/v1/admin/reindex` | Rebuild (internal) |

`GET /v1/suggest?q=ama&limit=8&locale=en-US` → `{ "suggestions": [{ "text", "score" }] }`

## High-Level Design (HLD)

![Search autocomplete architecture: CDN, suggest API, Redis, trie/ES, logs, top-K](/images/hld/search-autocomplete-architecture.svg)

```
Client → LB → Suggest API
         ├─ Redis: hot prefix → top-K JSON
         ├─ Trie service OR Elasticsearch completion (FST)
         └─ Kafka: query logs → Top-K aggregator → refresh index
```

**Online:** normalize → Redis → trie/ES → optional personalize merge. **Offline:** aggregate logs → update per-prefix heaps or daily trie rebuild.

## Deep dive

**Trie + top-K:** Each node holds min-heap size K — lookup O(prefix len). Shard by first char/locale or use ES completion at scale. Redis key `suggest:{locale}:{prefix}` TTL 5–60m. Typos/fuzzy = v2.

## Failures and scale

- Index down → Redis popular prefixes or static fallback.
- Hot key `a` → replicate cache entry; CDN only where privacy allows.
- Batch ranking updates every N minutes to control cost.
- [Rate limiter](/hld/rate-limiter) on scripted scrape patterns.

**Phrase:** Prefix index with per-node top-K, Redis for hot prefixes, offline log aggregation to refresh scores.

**Remember:** Precompute top-K at write time (offline), not scan all phrases per keystroke; eventual ranking is fine for suggest.

**See also:** [Caching](/hld/caching-strategies), [Yelp](/hld/yelp), [FB Post Search](/hld/fb-post-search).
