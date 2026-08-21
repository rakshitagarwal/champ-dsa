# Yelp

> Local business search. Combine **text + geo + rating** without scanning the planet. Photos and reviews are the heavy extras.

## What they ask

"Pizza near me, open now, 4+ stars." Map pins + list. Click through to a business page.

## Requirements

**Functional:** search businesses, filters, business page, reviews (scoped), photos.

**Non-functional:** p95 search in ~200ms, results biased to nearby, review writes don't have to appear in search instantly.

## API

1. `GET /search?q=&lat=&lng=&radius=&minRating=&openNow=`
2. `GET /businesses/{id}`
3. `POST /businesses/{id}/reviews`

## Design

**Source of truth:** Postgres — Business, hours, attributes. Reviews table. Photos in S3.

**Search index:** [Elasticsearch](/system-design/elasticsearch) with `geo_point`, text on name/category, filters on rating, price, hours. Async index on write.

**Query:** geo bounding box (map) or radius, plus `match` on query, plus range on rating. Sort by `_score` × distance decay, or a simple formula you can explain.

**Hot cities:** cache `q+geohash+filters` in [Redis](/system-design/redis) for popular tiles ("coffee" in downtown SF).

**Business page:** cache by id; reviews paginated from DB.

## Deep dive — geo + text together

If you only filter geo in SQL, "pizza" search is weak. If you only use ES text, you rank a famous pizza in another country. **Filter geo first** (cheap), then text + rating.

**Open now:** denormalize today's hours into the index or filter in app after a slightly larger candidate set (hours are awkward in ES).

**Map move:** don't re-query the world — search the viewport bounding box, debounce the map.

## Extra probes

1. Spam reviews — rate limit + moderation queue
2. Ranking ads — separate sponsored list, labeled
3. Suggest as you type — completion suggester / prefix

**Phrase:** "Postgres owns the business. ES is geo + text. I filter the map viewport, then rank. Popular tiles sit in Redis. Reviews can lag in search."
