# Uber

> Ride hailing. The unique piece is **nearby search on moving drivers**, then a **trip state machine**. Payments and maps are boxes, not the whole hour.

> Trip state in Postgres with CAS; driver GPS in Redis GEO per city. Match = GEOSEARCH + atomic accept; surge in Redis cache.

## What they ask

**Scenario:** Rider sees nearby cars, requests ride, gets matched, tracks live location, pays, rates. Driver streams GPS continuously.

**What the interviewer really tests:**
- **Moving location** out of the transactional trip store.
- **Geo nearby search** (Redis GEO / geohash / S2) — not SQL lat BETWEEN.
- **Atomic assign** — two riders cannot get the same driver.
- Maps, pricing, [Payment System](/hld/payment-system) as external boxes.

**Example scale:** ~165K location updates/s (500K online drivers × every 3s); ~300 trip requests/s peak; trip DB writes tiny vs location.

## Requirements

**Functional:**
- Rider: nearby + ETA, request/cancel/track/rate. Driver: online/offline, accept, location stream, start/complete.
- Trip lifecycle: `requested → matched → enroute → in_progress → completed/cancelled`.

**Non-functional:**
- Match < 2s; location freshness < 5s; no double-assign; durable trip history.
- Idempotent payment effect on complete.

**Clarify:** v1 no Pool? City-sharded? Surge yes/no? Scheduled rides v2?

**Out of scope (v1):** Turn-by-turn nav, payroll, Pool optimization, fraud ML ETA.

## Scale estimation

| Metric | Result |
|--------|--------|
| Trips | ~58/s avg, ~300/s peak → Postgres OK |
| Location writes | ~165K/s → **must not** hit Postgres |
| Nearby reads | ~300 requests × ~50 GEOSEARCH each |
| Trip storage | ~5 GB/day |

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/trips` | Request ride |
| `GET` | `/v1/trips/{tripId}` | Status + driver + fare |
| `POST` | `/v1/trips/{tripId}/accept` | Driver accept (409 if taken) |
| `POST` | `/v1/trips/{tripId}/start` | At pickup |
| `POST` | `/v1/trips/{tripId}/complete` | Triggers payment |
| `POST` | `/v1/trips/{tripId}/cancel` | Cancel |
| `GET` | `/v1/drivers/nearby` | Map pins |
| `WS` | `/v1/stream` | Location + `trip_state`, `eta_update` |

**Request:** `{ pickup: {lat,lng}, dropoff, product: "UberX" }` → `{ tripId, status: "requested", etaSec }`. Idempotency-Key on transitions.

## High-Level Design (HLD)

![Uber architecture: trip API, matching, Redis GEO, location stream, ETA](/images/hld/uber-architecture.svg)

- **API Gateway:** auth, [Rate Limiter](/hld/rate-limiter), route by `city_id` from pickup geohash.
- **Trip Service:** state machine in [Postgres](/hld/sql-databases) per city shard; `UPDATE … WHERE status=expected`.
- **Location Service:** WS fleet → `GEOADD drivers:{city}` + 15s TTL; reap stale ("ghost cars").
- **Matching:** `GEOSEARCH` → offer N drivers → first `accept` wins DB CAS.
- **WS registry:** Redis `userId → node`; pub/sub trip channel for rider updates.
- **Pricing/surge:** demand/supply per geohash, cached 30s; maps ETA cached 60s.

**Match flow:** insert `requested` → GEOSEARCH → push offers → `UPDATE … WHERE status='requested'` → notify rider.

**Cancel/no-show:** state transitions with fee rules in Trip Service — not inferred from last GPS point.

| Path | Model |
|------|--------|
| Trip match/complete | Strong (Postgres CAS) |
| Driver location | Ephemeral Redis GEO |
| Payment | Idempotent charge on `tripId` |

## Deep dive — geo index

165K/s `UPDATE lat` in Postgres fails. **Redis GEO** (or S2 cells per city): O(log N + M) radius search; shard by **city**, not global user hash. Ghost cars: TTL + periodic `ZREM`.

## Deep dive — money and surge

**Complete:** trip row + outbox in one TX; payment consumer idempotent on `tripId`. GPS is not ledger truth — status in DB is. Surge: `multiplier = f(demand/supply)` from trip events + online driver counts; show estimate before confirm.

## Failures and scale

- Double accept: CAS → loser gets 409; no Kafka for assign lock.
- Redis down: nearby degraded; trip transitions still on Postgres; payments fail closed.
- WS drop: last known location + stale ETA; state from DB on reconnect.
- NYE hotspot: per-city Redis cluster + autoscale WS.
- [Geohashing](/hld/architecture-concepts) for interview depth if asked.
- Driver offline mid-trip: trip row unchanged; rider sees last fix until reconnect.
- Kafka for analytics/receipts only — never for assign locking.

**Phrase:** Trips are a durable state machine. Drivers live in a per-city geo index in Redis. Assign is atomic so two riders can't get the same car. GPS never is the source of truth for money.

**Remember:** Postgres CAS match → Redis GEO location → city shard → payment idempotent on tripId.
