# Local Delivery Service

> DoorDash / Uber Eats minus the restaurant menu depth. The core is **geo matching + live tracking + ETAs**, like a lighter [Uber](/system-design/uber).

## What they ask

Customer places an order. Nearby courier picks it up from a store, drops it at the house. Track the bag on a map.

## Requirements

**Functional:** place order, dispatch courier, live location, delivery complete, ratings.

**Non-functional:** matching in a few seconds, location updates cheap enough for tens of thousands of couriers, order state durable.

**Clarify:** one courier per order (v1). No batching two orders onto one rider unless they ask.

## API

1. `POST /orders` `{ storeId, dropoff, items }`
2. `GET /couriers/nearby?lat=&lng=`
3. `POST /orders/{id}/accept` (courier)
4. `WS /orders/{id}/track` — location stream
5. `POST /orders/{id}/complete`

## Design

**Order service:** Postgres row with state machine `created → dispatched → picked_up → delivered`.

**Dispatch:** on create, query nearby idle couriers (geohash / Redis GEO). Rank by ETA, load, rating. Offer to K couriers; first accept wins (`UPDATE … WHERE status='offered'`).

**Location:** courier app pings every 2–5s. Don't write Postgres each ping. [Redis](/system-design/redis) GEO + last point. WebSocket to the customer subscribed to that order.

**ETA:** Haversine / OSRM / Maps API. Cache store→neighborhood times. Update when the courier actually moves.

**Notifications:** push if the app is backgrounded — [notification system](/system-design/notification-system).

## Deep dive — matching without double-assign

Two customers, one courier. Use a **lock** on courier id (Redis) or a transactional "assign if idle." Offers expire in 15s. If nobody accepts, widen the geohash ring (neighbors of the cell).

Peak dinner: surge pricing or longer ETAs — say it, don't build a marketplace thesis.

**Hot city:** shard dispatch by city / geohash prefix so NYC doesn't contend with a global queue.

## Extra probes

1. Store prep time vs courier wait — delay dispatch until food is almost ready
2. Proof of delivery: photo → S3
3. Payments: capture on delivery; separate [payment](/system-design/payment-system) service

**Phrase:** "Orders are a state machine in Postgres. Couriers sit in Redis GEO. Match with an optimistic assign so two orders can't grab the same rider. GPS stays in memory; only status changes are durable."
