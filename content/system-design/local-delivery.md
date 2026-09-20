# Local Delivery Service

> DoorDash / Uber Eats minus the restaurant menu depth. The core is **geo matching + live tracking + ETAs**, like a lighter [Uber](/hld/uber).

> When an order arrives, find nearby couriers with geo search (Redis GEO / geohash), compute ETA, and lock assignment with CAS.

## What they ask

**Scenario:** Customer orders from a store; nearby courier picks up and delivers; customer tracks the bag on a map.

**Tests:** Order state machine durable vs location ephemeral? Geo matching without double-assign? Live tracking + ETA without DB per ping? Dinner-rush surge and widening radius?

**Scale:** 50k couriers/city, 200k orders/day nationally; courier ping ~every 3s → ~16k location writes/s per large city.

## Requirements

**Functional (≤6):** Place order + track + rate; courier online/offers/accept/location/status; store prep-ready; dispatch match + offer TTL; push notifications.

**Non-functional:** Dispatch < 3s; location propagation < 1s; order reads < 100ms; exactly-one courier per active order; ETA within ~2 min.

**Clarify (≤4):** One order per courier (v1)? Ranking beyond distance? Capture on delivery vs order? Single city vs national shards?

**Out of scope (v1):** Full menu/KDS; batched route optimization; advanced fraud beyond [rate limiting](/hld/rate-limiter).

## Scale estimation

| Metric | Result |
|--------|--------|
| Orders (large city peak) | ~8/s |
| Location writes/city | ~16.6k/s — **Redis GEO**, not Postgres |
| Order rows (3y) | ~219M — indexed, not sharded early |
| WebSockets (active orders) | ~60k/city — 6–10 gateway nodes |

**Insight:** Order QPS is modest; location QPS is high and ephemeral.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/orders` | Place order |
| `GET` | `/v1/orders/{id}` | Status + ETA |
| `POST` | `/v1/orders/{id}/accept` | Courier accept → `409` if taken |
| `POST` | `/v1/orders/{id}/status` | picked_up / delivered |
| `POST` | `/v1/couriers/location` | Ping (or WS) |
| `WS` | `/v1/orders/{id}/track` | Live location + status |

```json
POST /v1/orders → 201 { "orderId", "status": "created", "etaMinutes": 32 }
```

## High-Level Design (HLD)

![Local delivery architecture: dispatch, Redis GEO, Postgres, WebSocket](/images/hld/local-delivery-architecture.svg)

```
Apps → API Gateway ([rate limiter](/hld/rate-limiter))
     → Order Service (Postgres state machine)
     → Dispatch (Redis GEO + offers)
     → Location (GEOADD + pub/sub)
     → ETA (Maps/OSRM cache)
     → WebSocket Gateway → customer track
Postgres: orders, couriers (last known)   Redis: positions, locks, offers
Kafka → notifications, analytics
```

**Flow:** `OrderCreated` → `GEORADIUS` idle couriers → offers (15s TTL) → first successful `accept` CAS wins → location pub/sub to WS → ETA refresh on meaningful movement.

## Deep dive

**No double-assign:** `UPDATE orders SET courier_id=… WHERE status='created'` — one row wins; optional `SET courier:{id}:lock NX EX 15` before offer. Loser re-dispatches with wider radius.

**Location + ETA:** Never Postgres per ping. `GEOADD` + TTL offline detection. ETA = prep + courier→store + store→customer; cache neighborhood ETAs; Haversine fallback if Maps down.

## Failures and scale

- Shard dispatch/location by city or geohash prefix.
- Redis down → stale `couriers.last_ping`; skip stale riders.
- Postgres down → queue creates on [Kafka](/hld/message-queue), replay.
- WS down → poll `GET /orders/{id}` + FCM.
- No courier in 6km → widen radius, surge signal, honest ETA to customer.
- Payment: auth on create, capture on delivered ([payment-system](/hld/payment-system)).

**Phrase:** Orders are a state machine in Postgres. Couriers sit in Redis GEO. Match with optimistic assign so two orders can't grab the same rider. GPS stays in memory; only status changes are durable.

**Remember:** Separate durable order state from ephemeral GPS; CAS assign beats advisory offers alone; delay dispatch until prep minus rider travel time.
