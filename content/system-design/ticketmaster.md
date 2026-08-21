# Ticketmaster

> Flash sale for seats. The system is a **correct inventory lock**, not a pretty map of the arena. If two people can buy seat 12A, you failed.

## What they ask

On-sale at 10:00. 50k people, 5k seats. Hold a seat for 10 minutes while checkout finishes. No oversell.

## Requirements

**Functional:** browse events, select seats (or GA quantity), hold, pay, issue ticket.

**Non-functional:** fairness under spike, **strong consistency** on inventory, holds expire.

**Clarify:** reserved seating vs general admission. GA is a counter; reserved is row-level.

## API

1. `GET /events/{id}/seats`
2. `POST /holds` `{ eventId, seatIds[] }` → `{ holdId, expiresAt }`
3. `POST /checkout` `{ holdId, paymentMethod }`
4. `GET /orders/{id}`

## Design

**Catalog** (event, venue, seat map) can be cached hard — it barely changes.

**Inventory** is the hot row. Options:

1. **Postgres** `seats(event_id, seat_id, status, hold_until, user_id)` with `UPDATE … WHERE status='free'`. Unique `(event_id, seat_id)`.
2. **Redis** as a fast hold (`SET seat nx ex 600`) then write DB. Redis loss → you must reconcile; say that.
3. **Shard by event_id** so one Taylor Swift show doesn't lock the whole cluster.

**Queue at the door:** waiting room (virtual queue) so checkout isn't 500k connections. Token when it's your turn. This is an [API gateway](/system-design/api-gateway) + queue, not a bigger DB.

**Payment:** authorize during checkout; if payment fails, release hold. Idempotency key on checkout.

## Deep dive — holds and expiry

Hold is not sold. A worker or lazy check on read frees `hold_until < now()`. Checkout converts hold → sold in **one transaction**. If two checkouts race, only one `UPDATE` matches.

**Don't** decrement a `remaining` counter for reserved seats — two seat maps will drift. Counters are for GA (`remaining_ga`).

**Fairness:** random queue order or FIFO. Don't promise "fair" if you just use a cache stampede.

## Extra probes

1. Bots — device attestation, [rate limiter](/system-design/rate-limiter), waiting room
2. Transfers / barcodes — signed tokens, rotate on scan
3. Read replicas for browsing; **writes to primary only**

**Phrase:** "Browse is cached. Buying is a transactional seat row: hold with TTL, then sell on payment. A waiting room absorbs the 10:00 spike so inventory isn't the first thing that dies."
