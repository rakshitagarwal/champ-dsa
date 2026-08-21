# Uber

> Ride hailing. The unique piece is **nearby search on moving drivers**, then a **trip state machine**. Payments and maps are boxes, not the whole hour.

## What they ask

Rider sees ETAs, requests a car, driver accepts, both track until drop-off.

## Requirements

**Functional:** request, match, live location, start/end trip, pay, rate.

**Non-functional:** matching in seconds, location freshness, no double-assign of one car, durable trip records.

**Clarify:** one rider per car (v1). Cities, not the whole planet on one table.

## API

1. `POST /trips` `{ pickup, dropoff, product }`
2. `POST /trips/{id}/accept` (driver)
3. `WS` location for both sides
4. `POST /trips/{id}/start` / `complete`
5. `POST /trips/{id}/rate`

## Design

**Trip service:** Postgres (or similar) state: `requested → matched → enroute → in_progress → completed`. Money depends on this row.

**Location:** drivers stream GPS. **Redis GEO** or in-memory quadtree **per city**. Do not `UPDATE drivers SET lat=` in Postgres at 1Hz × millions.

**Nearby:** geohash prefix or GEOSEARCH radius. Filter by product (UberX), occupancy, heading.

**Match:** offer to N closest. First accept wins with an atomic `UPDATE trips SET driver=? WHERE status='requested'`. Notify via WS + push.

**Routing / ETA:** Maps provider. Cache popular edges. Surge: multiplier per geohash when `demand/supply` is high.

**Payments:** [payment system](/system-design/payment-system) after complete; auth hold at match if needed.

## Deep dive — geo index

Naive SQL `lat BETWEEN` does not scale. **Geohash:** nearby cells = this cell + neighbors. As drivers move, remove from old cell, add to new.

**Quadtree / Google S2:** same idea, nicer cells.

**City shard:** dispatch workers and Redis belong to `city_id`. A NYC request never locks Bangalore.

**Ghost cars:** TTL on location. If no ping in 15s, drop from GEO.

## Extra probes

1. Driver app offline in a tunnel — trip still in DB; location stale
2. Cancel / no-show fees — state machine events
3. Kafka for analytics and receipts, not for the assign lock

**Phrase:** "Trips are a durable state machine. Drivers live in a per-city geo index in Redis. Assign is atomic so two riders can't get the same car. GPS never is the source of truth for money."
