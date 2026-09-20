# Search Autocomplete

> Typeahead / search suggestions. The hard parts are **prefix lookup latency**, **top-K ranking**, and **keeping the index fresh** under query spam.

> Serve prefixes from a trie or Elasticsearch completion index, cache hot prefixes in Redis, rank by frequency (and personalization later). Update top-K offline from query logs.

## What they ask

**Scenario:** "Design Google-like autocomplete — as the user types `ama`, show `amazon`, `amazon prime`, … within ~50–100ms."

**What the interviewer really tests:**
- Data structure for prefixes (trie vs inverted / ES completion suggester).
- How you maintain **top-K per prefix** without scanning the world on every keystroke.
- Caching hot prefixes (`a`, `am`, trending terms).
- Personalization, typos, and abuse (scraping).

**Example scale:** 100M DAU, ~20 queries/user/day → ~20k QPS avg, 100k peak; each query 3–8 keystrokes of suggest calls; vocabulary 10M+ phrases.

## Requirements

**Functional:**
- `GET /v1/suggest?q=ama&limit=10` → ranked suggestions.
- Optional: personalization, locale, category filters.
- Offline: ingest query logs → update frequencies.

**Non-functional:**
- **Latency:** p99 < 100ms end-to-end (often < 50ms in-region).
- **Availability:** degrade to popular static list if index fails.
- **Freshness:** new trending terms within minutes–hours, not weeks.
- **Consistency:** eventual for rankings — exact global order not required.

**Clarify:** fuzzy/typo tolerance? personalized? multi-language? safe-search?

**Out of scope (v1):** full web search results page, ads bidding.

## Scale estimation

| Metric | Math | Result |
|--------|------|--------|
| Suggest QPS | 20k searches × ~5 keystrokes | ~100k suggest/s peak possible |
| Payload | 10 strings × ~40 B | tiny — CPU/index bound |
| Hot prefixes | head of Zipf | Redis must hold top prefixes |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/suggest` | Prefix suggestions |
| `POST` | `/v1/admin/reindex` | Trigger rebuild (internal) |

```
GET /v1/suggest?q=ama&limit=8&locale=en-US
→ 200 { "suggestions": [{"text":"amazon","score":0.98}, ...] }
```

**Errors:** `400` empty/too long query, `429` rate limited.

## High-Level Design (HLD)

![Search autocomplete architecture: CDN, suggest API, Redis, trie/ES, logs, top-K](/images/hld/search-autocomplete-architecture.svg)

```
Client → CDN / LB → Suggest API
              ├─ Redis: hot prefix → top-K JSON
              ├─ Trie service OR Elasticsearch completion index
              ├─ (optional) Personalization service
              └─ Async: Query logs → Kafka → Top-K aggregator → refresh index
```

**Online path:** normalize query (lowercase, trim) → Redis → else trie/ES → optional personalize merge → return.

**Offline path:** sample search logs → count phrase frequencies → for each phrase, update all prefixes' heaps (or rebuild daily trie dumps).

## Deep dive — trie + top-K

- Each trie node can store a **min-heap of size K** of best phrases under that prefix — lookup O(prefix length).
- Memory: full trie for 10M phrases is large — shard by first character / locale, or use ES completion (FST) in production interviews.
- **Cache:** Redis key `suggest:{locale}:{prefix}` TTL 5–60 min; invalidate on rebuild.
- **Typos:** v2 — fuzzy at leaf or separate spell-correct before suggest.
- **Abuse:** rate limit by IP/user; captcha on scripted patterns.

## Failure and scale

- Index down → serve Redis-only popular prefixes; else empty with 503 + static fallback.
- Hot key `a` → replicate cache, CDN for anonymous top results where privacy allows.
- Ranking freshness vs cost — batch updates every N minutes.

**Closing phrase:** *"Prefix index with per-node top-K, Redis for hot prefixes, offline log aggregation to refresh scores."*

**See also:** [Caching](/hld/caching-strategies) (sketches / top-K), [Yelp](/hld/yelp), [FB Post Search](/hld/fb-post-search).
