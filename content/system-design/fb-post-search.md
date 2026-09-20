# FB Post Search

> Search **posts you are allowed to see**. Privacy is the product. A naked Elasticsearch cluster of all of Facebook would fail the interview.

> Candidate ids from ES, privacy filter in Postgres via hasAccess. No naive ES dump — hydrate + filter.

## What they ask

"Search posts — friends/groups/public you can access, <200ms, 100B+ posts." Single ES index with UI-side filter **fails privacy**.

**Tests:** ACL-first indexing; avoid 4000-friend `terms` query; ES hint + **read-time re-check**; graph cache; unfriend/block propagation.

**Scale anchor:** ~500M posts/day index churn; ~200k search QPS; friend avg ~300.

## Requirements

**Functional:**
- Keyword search on post text; filters (`from:`, `date:`, `group:`, location).
- Only posts viewer may see (public, friends, group membership, custom lists).
- Real-time enough: new post searchable within ~10s for most cases.
- Cursor pagination; optional typeahead; honor block/unfriend/delete/edit/audience change.

**Non-functional:**
- p95 <200ms search; correctness over recall.
- [Elasticsearch](/hld/nosql-databases) is derived; Post DB is ACL source of truth.
- Operable at 200k QPS reads with caching and shard expansion.

**Clarify:** Search post text only or comments/OCR v2? Multilingual? How fast must block/unfriend hide results (<10s)?

**Out of scope (v1):** Open web search, home feed ranker, nested comment index.

## Scale estimation

| Dimension | Assumption | Result |
|-----------|-----------|--------|
| Posts retained | ~100B × ~2KB doc | ~100 TB ES (sharded + replicas) |
| Index writes | ~500M/day (incl. edits) | ~5.8k/s avg, ~20k peak |
| Search QPS | 200k global peak | ES + graph cache required |
| Typeahead QPS | ~2× search | Lighter prefix index |
| Friend list | avg ~300, p99 ~5k | Never expand full list in every ES query |
| Hydration | 200k × 10 hits × ~5KB | Memcached + batch mget — not 2M DB/s |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/search/posts` | `q`, filters, cursor (viewer from token) |
| `GET` | `/v1/search/people` | Optional people search |
| `GET` | `/v1/search/typeahead` | Prefix suggest |

Indexer consumes [Kafka](/hld/message-queue) `post_events` — not public REST in steady state.

## High-Level Design (HLD)

![FB post search: search svc, index, graph ACL, ranker](/images/hld/fb-post-search-architecture.svg)

```
Post DB → Kafka → Indexer → Elasticsearch (authorId, audienceType, groupId, text — not 4000 friend ids per doc)
Search Service → Social graph cache (Redis/TAO) → ES bool query (public OR group OR friends subset)
  → top ~100 ids → Memcached hydrate → canView() re-check → rank (BM25 × recency × affinity)
```

**Indexer:** Stores `authorId`, `audienceType`, `groupId`, text — **not** expanded friend lists per doc. Version gate on `updatedAt` for out-of-order events.

**Write path:** DB commit → outbox/[Kafka](/hld/message-queue) → ES upsert (5–10s refresh). **Read path:** Graph cache → ES → hydrate → `canView()` — drop stale/leaked hits; log for audit.

## Deep dive — privacy vs recall

Three layers: index fields prune most invisible docs; query constrains to searchable authors + public + groups; **hydration re-check** catches stale ES (5–10s window). Don't expand all friends into each post doc (unfriend would reindex thousands).

## Deep dive — graph cache and ranking

Cache tiered "searchable authors" (~500 interacted + groups) — not full 5k `terms` every query. Block list in Redis checked on hydrate. Rank: BM25 + `exp(-age/72h)` + affinity boost; cursor = ES `search_after`.

## Handling failures and scale

- **ES shard loss:** Replica serves reads; rebuild shard from Kafka replay + DB backfill.
- **Indexer lag:** Alert lag >10s; search may be stale but hydrator still enforces ACL.
- **Graph cache miss storm:** Singleflight rebuild; stale-while-revalidate 5m TTL.
- **Block/unfriend:** Invalidate graph keys + short Redis denylist on hydrate path.
- **Celebrity viral post:** Memcached 60s + negative cache on deleted posts.
- **ES refresh:** 5–10s interval — name staleness window; re-check closes the gap.
- **Scale:** Add ES data nodes; shard by `postId` hash; separate typeahead cluster.

**Phrase:** ES is a hint, not the ACL. I constrain authors you can see, search that subset, then re-fetch posts and drop anything the viewer shouldn't see.

**Remember:** Correctness > recall; query-time + read-time ACL; Kafka CQRS from Post DB.
