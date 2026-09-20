# Online Auction

> eBay-style bids. The last seconds of a popular lot are a **consistency + burst** problem. Whoever wins must match the ledger.

> Last-second bids need serializable DB isolation, live prices over WebSocket, anti-sniping — throughput vs consistency is the trade-off.

## What they ask

**Scenario:** Sellers list items; buyers bid; highest bid when the clock hits zero wins. A viral lot gets **10k concurrent bidders** in the final 10 seconds — accept bids, broadcast live price, declare **one deterministic winner** matching the durable ledger.

**What the interviewer really tests:**
- Strong vs eventual consistency (who decides the winner?)
- Serializing contended writes without killing uncontended auctions
- Real-time fan-out ([WebSockets / SSE](/hld/networking)) decoupled from the transaction
- Idempotency, server clock, idempotent close/settlement

## Requirements

**Functional:** Create auction (price, reserve, increment, start/end). Place bid. Watch live (price, time left, history). Close + declare winner; notify; payment hook. Search/browse (basic).

**Non-functional:** Serializable winning bid; burst ~10k rps on one `auctionId`; durable auditable bid history; live updates <500ms; HA reads.

**Clarify:** English auction? Reserve visible? Anti-snipe (+30s if bid in last 30s)? Proxy bidding? Hard vs soft close?

**Out of scope (v1):** Search relevance tuning, recommendations, disputes, seller reputation graph.

## Scale estimation

| Metric | Result |
|--------|--------|
| Reads | ~6k rps avg, ~30k peak (5M DAU) |
| Bid writes | ~500 rps normal; **10k rps × 30s** on hot auction |
| Storage | ~20 GB auctions + ~40 GB/year bids — modest |
| WS fan-out | 10k watchers × 1 bid/s → ~16 Mbps/hot auction; pub/sub sharding |

Challenge is **per-key contention and fan-out**, not total volume.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/auctions` | Create auction |
| `GET` | `/api/v1/auctions/{id}` | Current price, end time, winner if closed |
| `POST` | `/api/v1/auctions/{id}/bids` | Place bid |
| `GET` | `/api/v1/auctions/{id}/bids` | Bid history (cursor) |
| `WS` | `/ws/auctions/{id}` | Live price + time-left |

**Bid:** `{ amount, clientBidId }` + `Idempotency-Key` → `201 ACCEPTED` or `409 BID_TOO_LOW` with `currentPrice`, `minNextBid`.

## High-Level Design (HLD)

![Online auction: auction svc, bid store, proxy bids, settle](/images/hld/online-auction-architecture.svg)

- **API Gateway:** JWT, [rate limiter](/hld/rate-limiter) (~10 bids/sec/user), validation.
- **Auction Service:** CRUD, **server `now()`** as clock; idempotent close.
- **Bid Service:** dedup `clientBidId`; enqueue to [Kafka](/hld/message-queue) partition = `hash(auctionId)` → **single consumer serializes** hot auction DB writes.
- **Postgres:** source of truth — `SELECT … FOR UPDATE` per auction in consumer.
- **Redis:** cache `current_price`, `end_at`, `high_bidder`; pub/sub `auction:{id}:bids` for WS gateway.
- **Scheduler:** close at `end_at` (+ anti-snipe); `FOR UPDATE SKIP LOCKED`.
- **Kafka:** bid events → notifications, [payment system](/hld/payment-system), search index.

**Place bid:** gateway → dedup → partition queue → consumer transaction: validate OPEN, amount ≥ price+increment, insert bid, update auction, maybe extend `end_at` → commit → Redis pub/sub + Kafka.

**Watch:** `GET` cache-aside; WS subscribes to Redis channel.

## Deep dive — last-second bids and hot path

**Redis is display-only; Postgres wins.** Async Redis replication must not elect two winners — winner = row after `close` commits. Stale cache ~100ms OK.

Never trust client clock — push `server_time` + `end_at`. Naive 10k `FOR UPDATE` on one row → lock queue; **partitioned worker** turns 10k concurrent hits into ~5ms sequential commits (~200 bids/sec per hot lot — enough).

**Anti-snipe:** if bid within 30s of end, `end_at = now() + 30s` in same transaction.

## Deep dive — close and settlement

Close: `UPDATE … SET status=CLOSED WHERE status=OPEN` — one winner. Enqueue `AuctionClosed` → charge winner (idempotency key `auctionId`), [notification system](/hld/notification-system). Payment fail → retry, don't revert winner. Proxy bidding (v2): hidden `max_bid`, auto-increment in loop inside transaction.

## Failures and scale

- DB down: reads stale Redis; writes queue in Kafka with backpressure (503).
- Redis down: reads from Postgres; WS → polling every 2s; correctness unchanged.
- Kafka lag: replay with `clientBidId` idempotency — no double bid.
- Scheduler double-fire: `SKIP LOCKED` + status guard.
- Bid flood: per-IP/user rate limit, CAPTCHA, 429 + `Retry-After`.
- Scale: shard auctions by id; dedicated worker pool for hot partitions; WS gateway + Redis cluster.

**Phrase:** Bids serialize per item and commit in Postgres. Redis and WebSockets only show the price. The winner is whoever is on the row when we close — once, idempotently.

**Remember:** Kafka key = auctionId → FOR UPDATE consumer → Redis pub/sub for WS → anti-snipe in same txn → close idempotent.
