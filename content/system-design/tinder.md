# Tinder

> Swipe app. The product is **geo + recs + a cheap deck**, not a full social graph. Don't design Facebook.

> Pull candidates via geo + filters, queue swipes, rank recommendations async. Locations in Redis GEO, photos in S3 + CDN.

## What they ask

**Scenario:** "Design Tinder — show a stack of nearby people, swipe right/left, mutual right = match + chat."

**What the interviewer really tests:**
- How you index **geo + filters** (age, gender) without scanning a city?
- Where you store **swipes** so "already swiped" is O(1) and a **match** is a double-key check?
- Can you make **recs cheap** — precomputed deck vs live geo query, Bloom filter for history?
- Whether you handle **location privacy**, hot users, and chat auth (only matched users).

**Example scale:** 50M users, 500M swipes/day (~5.8k/s avg, 30k/s peak). Each `GET /recs` must return 20 profiles in <200ms.

## Requirements

**Functional:**
- Profile: photos (S3/CDN), bio, age, gender, preferences (distance, age range).
- Location updates; nearby candidates via geo index.
- Recs deck excluding swiped/blocked; swipe left/right; mutual right → match.
- Match list, unmatch/block; 1:1 chat only if matched (reuse [WhatsApp](/hld/whatsapp) lite).

**Non-functional:**
- Deck p95 <200ms; swipe <100ms; match notify <1s.
- Exactly-once swipe per pair; idempotent match creation.
- Privacy: distance buckets, not exact lat/lng; rate-limit location spoofing.

**Clarify:** Max distance default? Boost / Super Like? Chat media v1? Hide inactive >30d?

**Out of scope (v1):** Full ML attractiveness pipeline, video profiles, photo verification at scale.

## Scale estimation

| Metric | Assumption | Math | Result |
|--------|-----------|------|--------|
| Swipes/day | 500M | /86400 | ~5.8k/s avg, ~30k/s peak |
| Recs QPS | 5M WAU × 20 recs/day | /86400 | ~1.2k/s avg, ~6k/s peak |
| Swipe storage | 500M × ~50B/row | | ~25 GB/day before archive |
| Geo index | 5M active × ~100B | | ~500 MB/replica — [Redis](/hld/caching-strategies) GEO |
| Photos | 50M × 5 × 500KB | | ~125 TB S3, CDN-cached |
| Recs bandwidth | 6k QPS × 40KB/deck | | ~240 MB/s meta + thumb URLs |

**Insight:** Swipe ledger dominates writes; recs must avoid city-wide scans.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `PUT` | `/v1/me` | Profile + preferences |
| `PUT` | `/v1/me/location` | Update lat/lng |
| `GET` | `/v1/recs?limit=20` | Recommendation deck |
| `POST` | `/v1/swipes` | Swipe on target |
| `GET` | `/v1/matches` | List matches |
| `WS` | `/v1/chat/{matchId}` | 1:1 chat (matched only) |

**Location:** `PUT /v1/me/location { lat, lng }` → `{ geohash, updatedAt }` (no raw coords to others).

**Swipe:** `POST /v1/swipes { "targetId", "dir": "right|left" }` → `{ "matched": true, "matchId" }` or `409 already swiped`.

## High-Level Design (HLD)

![Tinder architecture: geo, recs, swipe ledger, matches, chat](/images/hld/tinder-architecture.svg)

```
Client → CDN (photos) → API Gateway ([rate limiter](/hld/rate-limiter))
  ├─ Profile Service → Postgres + S3
  ├─ Location Service → Redis GEO (GEORADIUS + filters)
  ├─ Recs Service → deck cache + Bloom/SET swiped + offline scores
  ├─ Swipe Service → Cassandra swipes (PK=userId, SK=targetId) → match check → Kafka
  └─ Chat Service → WebSocket + Cassandra history (match authz)
```

**Roles:** **Recs** — cache `deck:{userId}` (next 50 ids); on miss: geo query ∩ prefs − swiped − blocked, rank (offline score + distance + last_active). **Swipe** — `IF NOT EXISTS` swipe row; on `right`, check reverse swipe → idempotent `matches` insert + Kafka notify. **Location** — return distance buckets, not raw lat/lng.

**Write (swipe):** Record swipe with `IF NOT EXISTS` → if mutual right, idempotent match row → [Kafka](/hld/message-queue) → push.

**Read (recs):** Hit `deck:{userId}` → return 20; miss → `GEORADIUS` + filters − Bloom swiped − blocked → rank → cache next 50 async.

**Chat auth:** Every WS message verifies active match row — no match, no send.

## Deep dive — cheap recs

NYC 50km can imply millions of candidates — **narrow:** `last_active` window, geohash/city prefix, age/gender filters, subtract Bloom/SET for swiped, rank top 100 → cache 50. **No ML on request** — nightly offline scores blended online. Boost = priority insert in deck.

## Deep dive — swipe ledger and matches

Cassandra/Dynamo `PK=(userId, targetId)` for O(1) history and duplicate prevention. Mutual swipe race: unique constraint on `(least(A,B), greatest(A,B))` — one wins, other returns existing match. Hot target (many incoming likes): paginate likers; don't fan-in one partition.

## Handling failures and scale

- **Redis GEO down:** Degrade to geohash prefix query in Postgres (fewer recs).
- **Swipe queue:** Buffer swipes in [Kafka](/hld/message-queue) if store slow; client shows optimistic UI.
- **Shard:** Swipes by `userId`; matches by pair hash; GEO by city shard.
- **Abuse:** Rate-limit swipes/min; shadow-ban → empty deck.
- **Match notify fail:** Client polls `GET /matches`; Kafka replay for push.
- **Deck stale on move:** Invalidate deck on significant location change.

**Phrase:** GEO for candidates, swipe ledger keyed by pair, match on reverse right. Precompute a small deck so swipe UI never waits on a city-wide query.

**Remember:** Deck = cache + Bloom; match = double-key + idempotent insert; never expose precise location.
