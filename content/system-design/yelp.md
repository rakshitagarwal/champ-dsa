# Yelp

> Local business search. Combine **text + geo + rating** without scanning the planet. Photos and reviews are the heavy extras.

> ES geo_point + text + rating, distance-decay ranking, separate autocomplete index, hot cities cached.

## What they ask

"Design Yelp — pizza near me, open now, 4+ stars." Map + list + business detail with reviews/photos.

**Tests:** Full-text + geo + filters in ~200ms p95; **ranking** not just filter; hot-tile caching; reviews async to search index.

**Example scale:** 30M businesses, 200M reviews; ~80k search QPS avg (~200k peak).

## Requirements

**Functional:** Search by `q` + lat/lng (radius or viewport), filters (rating, price, category, `openNow`), business detail, write reviews/photos, autocomplete.

**Non-functional:** Search p95 <200ms; Postgres = truth, ES eventual (seconds OK); geo-bias results; photos via CDN.

**Clarify — ask interviewer:**
- Is `openNow` a hard filter or ranking boost? (Often hard filter in interviews.)
- Viewport bbox vs radius-only? Both?
- Do rating updates appear in search instantly? (Say ~1 min async refresh.)

**Out of scope (v1):** Reservations/ordering, owner dashboard edits at scale, sponsored blending (name hook only).

## Scale estimation

| Quantity | Assumption | Result |
|---|---|---|
| Businesses | 30M × ~2 KB | ~60 GB Postgres |
| Search QPS | 80k avg, 200k peak | Redis tile cache critical |
| ES index | ~1.5 KB/doc | ~60 GB index (+ replicas) |
| Photos | 50M × ~2 MB | ~100 TB S3, CDN bandwidth |
| Business page QPS | ~40k (0.5× search CTR) | ~80% cached → low DB QPS |
| Review writes | ~150/s peak | tiny vs reads |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/search` | `q`, lat/lng, radius, filters, cursor |
| `GET` | `/v1/search/bounds` | Viewport (map move) |
| `GET` | `/v1/businesses/{id}` | Detail + hours |
| `GET` | `/v1/businesses/{id}/reviews` | Paginated reviews |
| `POST` | `/v1/businesses/{id}/reviews` | Write review (+ idempotency key) |
| `GET` | `/v1/suggest` | Autocomplete |
| `POST` | `/v1/businesses/{id}/photos/presign` | Photo upload |

Search response: light list (id, name, rating, distanceM, thumb URL) — not full review bodies.

## High-Level Design (HLD)

![Yelp architecture: geo + text indexes, hot tiles, autocomplete](/images/hld/yelp-architecture.svg)

```
Client → CDN → API Gateway
  Search / Business / Review+Photo services
  Elasticsearch (geo_point + text) ← Kafka indexer ← Postgres (CDC)
  Redis — tile cache `search:{geohash5}:{q}:{filters}` + `biz:{id}`
  S3 — photos (async thumbs)
```

**Write (review):** Postgres txn → Kafka → ack 201 → indexer updates ES; invalidate `biz:{id}`.

**Read (search):** Redis tile hit → else ES bool: geo filter + text match + rating/price + distance decay (`gauss` or `exp(-d/1.5km)`) → cache 45s TTL.

**Read (detail):** Redis `biz:{id}` → replica; reviews paginated separately.

## Deep dive — geo + text together

Filter geo first (viewport/radius — high selectivity), rank text inside. ES: `must` multi_match on name/categories, `filter` geo + rating, `should` distance decay. Avoid ranking a famous pizza 2000 km away above the shop next door.

## Deep dive — open now and hot tiles

**Open now:** Denormalize today's UTC open intervals at index time, or post-filter top-N with `hours_json` + timezone (interview-brief). **Hot tiles:** Same query in downtown SF → cache key `geohash5 + q + filters`, singleflight on miss, 30–60s TTL.

## Handling failures and scale

- **ES down:** Degrade to PostGIS radius + simple name match (banner: incomplete results).
- **Indexer lag:** Search slightly stale; Postgres still authoritative for detail.
- **Spam reviews:** Rate limits + idempotency key + async moderation.
- **Indexer lag:** Alert consumer lag >10s; search stays up on ES + tiles.
- **Deep pagination:** ES `search_after` cursor — avoid large `offset`.

**Phrase:** Postgres owns the business. ES is geo + text. Filter the map viewport, then rank with distance decay. Popular tiles sit in Redis. Reviews can lag in search.

**Remember:** Filter-then-rank; tile cache for repeated queries; never block review write on ES index.
