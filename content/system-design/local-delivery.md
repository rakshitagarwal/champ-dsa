# Local Delivery Service

> DoorDash / Uber Eats minus the restaurant menu depth. The core is **geo matching + live tracking + ETAs**, like a lighter [Uber](/system-design/uber).

## What they ask

**Scenario:** "Design DoorDash — customer places an order, nearby courier picks it up from a store, drops it at the house. Track the bag on a map."

**What the interviewer really tests:**
- Can you model an **order state machine** durably while keeping **location updates** cheap and ephemeral?
- How you do **geo matching** (geohash / [Redis](/system-design/redis) GEO / S2) and avoid **double-assigning** the same courier?
- Whether you can deliver **live tracking** (WebSocket) and accurate **ETAs** without polling the DB.
- How you handle **peak dinner rush** — surge, widening search radius, queueing.

**Example scale:** City with 50k couriers, 200k orders/day. Peak hour 30k orders/hour (~8/s city-wide, 200/s nationally). Each courier pings location every 3s → ~16k location QPS per city.

## Requirements

**Functional:**
- Customer: place order `{ storeId, items, dropoff, payment }`, track status, see courier live location + ETA, rate delivery.
- Courier: go online/offline, receive offers, accept/reject, update location, mark picked-up / delivered, capture proof of delivery.
- Store: accept order, provide prep time estimate, mark ready for pickup.
- Dispatch: match order to nearby idle courier, offer to K couriers, first accept wins, expire offers.
- Notifications: push to customer/courier on status changes.

**Non-functional:**
- **Latency:** dispatch decision < 3s; location propagation < 1s; order status reads < 100ms.
- **Availability:** order state durable (no lost orders); location pipeline may drop occasional pings.
- **Throughput:** support 10k concurrent active orders per large city; 50k courier location streams.
- **Consistency:** exactly-once assignment per courier (no double-book); order state linearizable.
- **Geo accuracy:** ETA within 2 minutes; handle courier GPS jitter.

**Clarify — questions to ask:**
- One courier per order (v1) or batching (2 orders per rider)?
- Courier selection criteria — distance only or rating, load, vehicle type?
- Payment model — capture on delivery vs on order? Tip handling?
- Return to restaurant if customer unavailable?
- Need surge pricing or fixed delivery fee?
- Coverage area — single city or multi-city sharding?

**Out of scope (v1):**
- Full restaurant menu management, inventory, or kitchen display system.
- Route optimization for batched orders (mention as v2).
- Advanced fraud / promo abuse system beyond rate limiting.

## Scale estimation

| Metric | Assumption | Math | Result |
|--------|-----------|------|--------|
| Orders per day (national) | 200k | 200k / 86400 | ~2.3 orders/s avg, ~10-20/s peak (dinner) |
| Per large city (NYC) | 30k / day, peak hour 30% | 9k / 3600 | ~2.5/s avg, ~8/s peak hour |
| Courier pings | 50k couriers * 1 ping/3s | 50k / 3 | ~16.6k location writes/s per large city |
| Order DB rows | 200k/day * 365 * 3 years | 200k * 1095 | ~219M rows — few GB, needs indexing not sharding for years |
| Location storage | ephemeral in Redis, 50k * ~200B | 50k * 200B | ~10 MB per city — trivial |
| Bandwidth (location) | 16k pings * 200B | 16k * 200B | ~3.2 MB/s per city |
| WebSocket connections | 30k active orders * 2 (customer+ courier) | 60k | ~60k concurrent WS — fits on ~6-10 nodes |

**Insight:** order QPS is modest — DB handles it. Location QPS is high but ephemeral — keep out of Postgres, use [Redis](/system-design/redis) GEO.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/orders` | Place order |
| `GET` | `/v1/orders/{id}` | Get order status + ETA |
| `GET` | `/v1/couriers/nearby?lat=&lng=&radius=` | Find nearby idle couriers (internal/dispatch) |
| `POST` | `/v1/orders/{id}/accept` | Courier accepts offer |
| `POST` | `/v1/orders/{id}/status` | Update status (picked_up, delivered) |
| `POST` | `/v1/couriers/location` | Courier location ping (or WS) |
| `WS` | `/v1/orders/{id}/track` | Subscribe to live location + status |
| `POST` | `/v1/orders/{id}/rate` | Rate delivery |

**Place order:**
```json
POST /v1/orders
Authorization: Bearer <customer_token>
{
  "storeId": "store_123",
  "items": [{ "itemId": "item_9", "qty": 2 }],
  "dropoff": { "lat": 40.7128, "lng": -74.0060, "address": "123 Main St" },
  "paymentMethodId": "pm_abc"
}
→ 201 { "orderId": "ord_789", "status": "created", "etaMinutes": 32 }
```

**Accept offer (courier):**
```json
POST /v1/orders/ord_789/accept
Authorization: Bearer <courier_token>
→ 200 { "orderId": "ord_789", "status": "dispatched", "pickupAddress": "..." }
→ 409 { "error": "already assigned" }
```

**Location ping:**
```json
POST /v1/couriers/location
{ "lat": 40.713, "lng": -74.005, "accuracy": 12, "speed": 4.2 }
→ 200 { "ok": true }
```

**Track (WebSocket):**
```
WS /v1/orders/ord_789/track
← { "type": "location", "lat": 40.713, "lng": -74.005, "etaMinutes": 8 }
← { "type": "status", "status": "picked_up", "at": "2026-08-25T10:05:00Z" }
```

## High-Level Design (HLD)

```
Customer App  Courier App  Store App
     |            |           |
     +-----+------+-----+-----+
           |
      CDN / L4 LB → API Gateway (auth, [rate limiter](/system-design/rate-limiter))
           |
     +-----+------+-------------------+
     |            |                   |
 Order Service  Dispatch Service   Location Service
 (Postgres)    (Redis GEO + Queue)  (Redis GEO + WS)
     |            |                   |
     +-----+------+-----+-------------+
           |
     +-----+-----+
     |           |
  Postgres   Redis Cluster  [Kafka](/system-design/kafka) → ETA Service, Notifications, Analytics
  (orders,   (courier pos,  → Maps API (OSRM) cache
   couriers)  offers, locks)
           |
     WebSocket Gateway → subscribed customers
           |
     [notification system] (FCM/APNS fallback)
```

**Component roles:**
- **Order Service:** owns order state machine (`created → dispatched → picked_up → delivered → rated` + `cancelled`). Writes to Postgres. Publishes `OrderCreated`, `OrderDispatched` to Kafka.
- **Dispatch Service:** triggered on `OrderCreated`. Queries `GEORADIUS` on [Redis](/system-design/redis) GEO index for idle couriers within radius (e.g., 2km), ranks by ETA/distance/rating, creates offers. Manages offer TTL (15s) and widening logic.
- **Location Service:** ingests courier pings (HTTP or WS), writes to Redis GEO (`GEOADD couriers:nyc lng lat courierId`), updates `courier:{id} → { lat, lng, ts, status }`. Publishes to WebSocket Gateway for subscribed order channels.
- **ETA Service:** computes `store→customer` and `courier→store` ETAs via Haversine initially, then OSRM/Maps API. Caches `store→neighborhood` ETAs in Redis. Updates when courier moves significantly (>50m).
- **WebSocket Gateway:** holds `orderId → { customerConn, courierConn }`. Pushes location + status diffs. Stateless behind LB with sticky or Redis pub/sub for cross-node fan-out.

**Write flow (place order):** Customer `POST /orders` → Order Service validates → inserts `orders` row `status=created` → publishes `OrderCreated` → Dispatch queries nearby couriers → creates offers in Redis → pushes via WS/push to K couriers → first `POST /accept` wins.

**Read flow (track):** Customer opens `WS /orders/{id}/track` → gateway subscribes to `order:{id}` channel → receives location updates from Redis pub/sub + status changes from Order Service → renders map with ETA.

## Low-Level Design (LLD)

**Database schema (Postgres):**
```sql
CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  role          VARCHAR(16) NOT NULL, -- 'customer' | 'courier' | 'store_owner'
  name          VARCHAR(255) NOT NULL,
  phone         VARCHAR(32) UNIQUE,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE stores (
  id            BIGSERIAL PRIMARY KEY,
  owner_id      BIGINT REFERENCES users(id),
  name          VARCHAR(255) NOT NULL,
  lat           DOUBLE PRECISION NOT NULL,
  lng           DOUBLE PRECISION NOT NULL,
  geohash       VARCHAR(12) NOT NULL,
  avg_prep_min  INT NOT NULL DEFAULT 12
);
CREATE INDEX idx_stores_geohash ON stores(geohash);

CREATE TABLE couriers (
  id            BIGSERIAL PRIMARY KEY REFERENCES users(id),
  vehicle       VARCHAR(16) NOT NULL, -- 'bike' | 'car' | 'scooter'
  status        VARCHAR(16) NOT NULL DEFAULT 'offline', -- 'offline'|'idle'|'busy'
  rating        NUMERIC(2,1) DEFAULT 5.0,
  lat           DOUBLE PRECISION,
  lng           DOUBLE PRECISION,
  last_ping_at  TIMESTAMPTZ
);
CREATE INDEX idx_couriers_status ON couriers(status);

CREATE TABLE orders (
  id            BIGSERIAL PRIMARY KEY,
  customer_id   BIGINT NOT NULL REFERENCES users(id),
  store_id      BIGINT NOT NULL REFERENCES stores(id),
  courier_id    BIGINT REFERENCES couriers(id),
  status        VARCHAR(16) NOT NULL DEFAULT 'created',
  -- created | dispatched | picked_up | delivered | cancelled
  dropoff_lat   DOUBLE PRECISION NOT NULL,
  dropoff_lng   DOUBLE PRECISION NOT NULL,
  dropoff_addr  TEXT NOT NULL,
  total_cents   INT NOT NULL,
  eta_minutes   INT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  dispatched_at TIMESTAMPTZ,
  picked_at     TIMESTAMPTZ,
  delivered_at  TIMESTAMPTZ,
  CONSTRAINT chk_status CHECK (status IN ('created','dispatched','picked_up','delivered','cancelled'))
);
CREATE INDEX idx_orders_customer ON orders(customer_id, created_at DESC);
CREATE INDEX idx_orders_courier ON orders(courier_id, status);
CREATE INDEX idx_orders_status_created ON orders(status, created_at);

CREATE TABLE order_items (
  order_id      BIGINT REFERENCES orders(id),
  item_id       VARCHAR(64) NOT NULL,
  qty           INT NOT NULL,
  price_cents   INT NOT NULL,
  PRIMARY KEY (order_id, item_id)
);

CREATE TABLE offers (
  id            BIGSERIAL PRIMARY KEY,
  order_id      BIGINT NOT NULL REFERENCES orders(id),
  courier_id    BIGINT NOT NULL REFERENCES couriers(id),
  status        VARCHAR(16) NOT NULL DEFAULT 'offered', -- offered|accepted|expired|rejected
  created_at    TIMESTAMPTZ DEFAULT now(),
  expires_at    TIMESTAMPTZ NOT NULL,
  UNIQUE (order_id, courier_id)
);
CREATE INDEX idx_offers_courier_status ON offers(courier_id, status);
```

**Key classes:**
```python
class OrderService:
    def create_order(self, customer_id, store_id, items, dropoff) -> Order: ...
    def transition(self, order_id, from_status, to_status, actor_id): ... # CAS

class DispatchService:
    def dispatch(self, order_id): ... # georadius → rank → offer
    def accept(self, order_id, courier_id) -> bool: ... # atomic assign
    def expire_offers(self): ... # cron or TTL

class LocationService:
    def ping(self, courier_id, lat, lng): ... # GEOADD + publish
    def nearby(self, lat, lng, radius_km, limit=20) -> List[Courier]: ...

class ETAService:
    def estimate(self, from_latlng, to_latlng) -> int: ... # minutes, cached
    def update_for_order(self, order_id, courier_latlng): ...

class WebSocketGateway:
    def subscribe(self, order_id, conn): ...
    def publish_location(self, order_id, latlng): ...
```

**Algorithms / concurrency:**
- **Geo index:** [Redis](/system-design/redis) `GEOADD couriers:{city} lng lat courierId` + `GEORADIUS couriers:nyc lng lat 2 km WITHDIST COUNT 20 ASC`. Alternative: geohash prefix scan (e.g., `geohash: "dr5ru"` → neighbors). S2 cells for finer control.
- **Atomic assign:** `UPDATE orders SET courier_id=:cid, status='dispatched' WHERE id=:oid AND status='created'` — `rowcount==1` wins; else `409`. Or Redis lock `SET courier:{id}:lock NX EX 15` before offer.
- **Ranking:** `score = 0.6*distance + 0.2*eta + 0.1*rating + 0.1*load`. Prefer idle > returning. Filter by vehicle capability.

**Patterns:** State Machine, Optimistic Locking (CAS), Pub/Sub (WS), Strategy (ranking), Circuit Breaker (Maps API).

## Deep dive — matching without double-assign

**Race:** Two customers 500m apart, one idle courier between them. Both dispatches query `GEORADIUS`, both see same courier, both offer. Courier could accept both if not guarded.

**Solution:**
1. **Optimistic DB assign:** Offers are advisory. Only `UPDATE orders ... WHERE status='created'` decides. Even if two offers sent, only one `accept` transaction succeeds. Loser gets `409` and trigger re-dispatch for its order (widen radius or next courier).
2. **Redis lock per courier:** Before offering, `SET courier:{id}:lock {orderId} NX EX 15`. If fails, skip that courier. On accept, extend lock to `busy` TTL. On expire/reject, `DEL` lock.
3. **Offer TTL + widening:** Offer `expires_at = now()+15s`. If no accept, cron or keyspace notification expires it, then dispatch widens search to 4km, then 6km. Mention geohash neighbor expansion: take 8 neighbors of current cell.

**Peak handling:** City partitioned by dispatch shard (by `geohash[0:2]` or `city_id`) so NYC dispatcher doesn't contend with SF. Use Kafka partitioned by `store geohash` for order creation events.

## Deep dive — live location and ETA

**Why not Postgres per ping?** 16k writes/s per city would saturate DB and be pointless — location is ephemeral. Keep in [Redis](/system-design/redis) GEO + `courier:{id} → last point` with TTL 30s (if no ping, mark offline). WebSocket gateway subscribes to `courier:{id}` channel via Redis pub/sub.

**ETA:** Initial ETA = `store prep time (12m) + courier→store (Maps API) + store→customer`. Cache `store→neighborhood` (geohash prefix) ETAs for 1h. Update ETA when courier moves >50m or every 30s — don't recompute per ping. Haversine is fallback if Maps API down: `distance = 2R*asin(...)`, `time = distance / avg_speed(25 km/h bike)`.

**Battery trick:** Courier app adaptively pings: 2s when dispatched/picked_up, 5s when idle, 10s when offline. Server drops pings with `accuracy > 100m`.

## Deep dive — order state machine durability

**State machine:** `created → dispatched → picked_up → delivered` (plus `cancelled` from `created/dispatched`). Each transition is a **transaction**:
```sql
UPDATE orders SET status='dispatched', courier_id=:cid, dispatched_at=now()
WHERE id=:oid AND status='created';
```
Store `order_events(order_id, from_status, to_status, actor_id, at)` for audit. Use idempotency key on `POST /accept` (client retries safe). If courier app crashes mid-delivery, order stays `picked_up` — customer sees last location + re-assign flow after timeout (e.g., 30m no update → support).

**Store prep vs dispatch timing:** Don't dispatch courier immediately if food needs 20m. Compute `dispatch_at = now() + max(0, prep_time - eta_courier_to_store - 2m)` and delay Kafka message (delayed queue) so courier arrives just as food is ready.

## Handling failures and scale

- **Sharding:** Shard `orders` by `city_id` or `geohash` prefix; dispatch and location services per-city. Courier state in city-local Redis.
- **Replication:** Postgres primary per shard + read replicas for order history; writes to primary only. Redis Cluster with replicas; persistence AOF for offers.
- **Caching:** ETA cache in Redis; store metadata cached. Courier `nearby` results not cached long (5s max) — must be fresh.
- **Failure modes:** Redis down → degrade to DB `couriers` table last lat/lng (stale) + don't offer to couriers with `last_ping_at > 30s`. Postgres down → queue orders in Kafka, replay when back. WS gateway down → clients fallback to polling `GET /orders/{id}` every 5s + FCM push.
- **Overflow:** If no courier in 6km within 2m, notify customer "high demand, ETA longer" and keep retrying with exponential widening. Surge pricing signal to lure couriers.
- **Payments:** capture on `delivered` (auth on `created`, capture later via [payment-system](/system-design/payment-system)); handle refunds via idempotent `captureId`.

## Extra probes / Interview follow-ups

1. **Batching:** If they ask "2 orders per courier," introduce `courier_capacity=2`, queue orders by dropoff proximity, TSP-ish route optimization.
2. **Proof of delivery:** photo upload → S3 via pre-signed URL, attached to `orders.proof_url`.
3. **Fraud/abuse:** device attestation, [rate limiter](/system-design/rate-limiter) on `POST /orders` (5/min per customer), anomaly detection on GPS spoofing.
4. **Reassignment:** courier cancels → `UPDATE orders SET status='created', courier_id=NULL` + re-dispatch, notify customer.
5. **Analytics:** Kafka → clickhouse for `orders per hour`, `avg delivery time`, `courier utilization` dashboards.

**Phrase:** Orders are a state machine in Postgres. Couriers sit in Redis GEO. Match with an optimistic assign so two orders can't grab the same rider. GPS stays in memory; only status changes are durable.
