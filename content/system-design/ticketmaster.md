# Ticketmaster

> Flash sale for seats. The system is a **correct inventory lock**, not a pretty arena map. If two people buy seat 12A, you failed.

> Postgres `FOR UPDATE` holds with 10-min TTL; waiting room before inventory; shard by `eventId`. Same pattern as BookMyShow / flight holds.

## What they ask

**Scenario:** On-sale at 10:00 — 50k people, 5k seats. Hold 10 minutes for checkout. **No oversell.**

**What the interviewer really tests:**
- **Strong consistency** on inventory under thundering herd.
- **Holds + TTL** and atomic hold → sold.
- **Waiting room** so DB is not first to die.
- Reserved vs GA, sharding by `event_id`, idempotent payment.

**Example scale:** Hot event: ~50k concurrent at T+0, ~10k hold attempts/s, ~5k successful holds/s; browse ~100k QPS (CDN/cache).

## Requirements

**Functional:**
- Browse events/seat map; hold specific seats or GA quantity.
- Checkout hold → tickets (signed barcode); release or auto-expire.

**Non-functional:**
- Zero oversell; holds expire reliably.
- Seat map < 300ms; hold < 500ms; checkout < 2s (payment dominates).
- Fairness: queue + bot mitigation.

**Clarify:** Reserved vs GA? Hold duration? Max tickets/user? Waiting room vs FCFS? Payment idempotency?

**Out of scope (v1):** Dynamic pricing auction, secondary marketplace, 3D venue rendering.

## Scale estimation

| Metric | Result |
|--------|--------|
| Seat rows | ~50M total — modest size; **hot row contention** is the killer |
| On-sale | ~4–10k reads/s; ~5k successful holds/s on one event shard |
| Seat map burst | ~5 GB once — CDN + ETag |

Queue + shard so one event's writes stay local and controlled.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/events`, `/v1/events/{id}` | Catalog |
| `GET` | `/v1/events/{id}/seats` | Map (cached, ETag) |
| `GET` | `/v1/queue/token` | Waiting room position |
| `POST` | `/v1/holds` | Hold seats |
| `POST` | `/v1/checkout` | Pay → order + tickets |
| `GET` | `/v1/orders/{orderId}` | Order |
| `POST` | `/v1/holds/{id}/release` | Release |

**Hold:** `{ eventId, seatIds[], gaQuantity? }` + `X-Idempotency-Key` → `{ holdId, expiresAt, priceCents }` or `409` unavailable.

## High-Level Design (HLD)

![Ticketmaster architecture: waiting room, inventory, holds, payment](/images/hld/ticketmaster-architecture.svg)

- **Waiting room:** admit N users/s (e.g. 500); Redis ZSET queue + signed `queueToken` — [API gateway](/hld/api-design) validates before `POST /holds`.
- **Catalog:** events/venues — CDN + [Redis](/hld/caching-strategies), read replicas.
- **Inventory (primary per event shard):** `seats.status` free|held|sold; transactional hold.
- **Order service:** idempotency key; payment PSP authorize/capture; hold→sold in one TX.
- **Expiry worker:** sweeper + lazy check on read; `SKIP LOCKED` parallel.

**Hold:** `BEGIN` → lock seats `FOR UPDATE` in deterministic order → all `free` → set `held` + `hold_until` → commit.

**Checkout:** validate hold → pay (idempotent) → `UPDATE seats SET sold WHERE hold_id AND status='held'` → tickets.

**GA holds:** `UPDATE events SET ga_remaining = ga_remaining - :qty WHERE ga_remaining >= :qty` in same txn as `holds` row — no seat rows.

**Idempotent hold:** same `Idempotency-Key` + seats → return existing `holdId`, do not double-hold.

## Deep dive — holds and expiry

Reserved seats = **per-row** truth, not a global counter (counters only for GA `ga_remaining` with `UPDATE … WHERE >= qty`). Redis `SET NX EX` optional **advisory** only — DB arbiter prevents double-sell. Lazy free if `hold_until < now()`; sweeper authoritative.

## Deep dive — waiting room and sharding

50k connections at T+0 without queue exhausts pool; FIFO or lottery — ask interviewer. CAPTCHA + [rate limiter](/hld/rate-limiter) on holds. **Shard by `event_id`** so Taylor Swift transactions stay on one shard. Browse from replica/cache (5s staleness OK); writes always primary.

## Failures and scale

- Failover: holds may 503 — client backoff; queue pauses admission.
- Sweeper lag: seats look held longer — lazy expiry mitigates.
- Overload: 429 + Retry-After; slow queue admission.
- Payment: authorize before commit; idempotency key returns same order on retry.
- Redis fast-hold lost: rebuild from `seats WHERE status='held'`.
- Barcodes: signed JWT; invalidate on transfer.
- Waitlist on sold-out: Redis queue; offer seat on expiry via push ([notification-system](/hld/notification-system)).
- Transfer/resale: new barcode, old `tickets.status=transferred`.

**Phrase:** Browse is cached. Buying is a transactional seat row: hold with TTL, then sell on payment. A waiting room absorbs the 10:00 spike so inventory isn't the first thing that dies.

**Remember:** Queue → primary shard → FOR UPDATE hold → TTL → checkout CAS to sold → idempotent pay.
