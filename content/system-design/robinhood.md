# Robinhood

> Retail brokerage. **Correctness beats latency.** Order intake + execution story, not a hedge fund matching engine.

> Per-account ledger lock, holds before fill, idempotent `clientOrderId`, venue adapter for async fills — quotes are cache only.

## What they ask

**Scenario:** Buy/sell stocks, quotes, positions, buying power. Market hours 9:30–4 ET; **no double-spend** from two devices. You route to a clearing firm — you don't build NYSE.

**What the interviewer really tests:**
- Double-entry ledger, holds vs settled cash
- Idempotent order intake (double-tap Buy)
- Venue adapter + fill reconciliation (`execId` dedup)
- Market vs limit, partial fills, trading hours

**Example scale:** 10M accounts, ~500k orders/day (~6 QPS avg, **5k/s open burst**). Quotes: push/cache — not Postgres. Ledger ~1B entries/3yr append-only.

## Requirements

**Functional:** Quotes (delayed OK v1). Account: cash, buying power, positions. Orders: market/limit, cancel, fills. State machine: accepted → routed → filled. Holds on buy/sell. Market-hours gate. Idempotent submit.

**Non-functional:** Ledger is truth; per-account serializability; immutable audit; quotes may stale; order accept <200ms; fills async via WS/push.

**Clarify:** Cash-only vs margin? Fractional shares? Real venue vs sim? T+1 settlement vs instant buying power?

**Out of scope (v1):** Own matching engine, options/crypto 24/7, tax lots, charting/news.

## Scale estimation

| Metric | Result |
|--------|--------|
| Orders | ~6 QPS avg, 50 peak, **5k/s open burst** |
| Quotes | ~330k QPS if polled — **vendor WS → Redis**, never DB |
| Ledger | ~30M entries/month; range-partition by month |

Bandwidth = quote fan-out; money path = small but durable multi-AZ.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/quotes/{symbol}` | Last price (Redis) |
| `POST` | `/v1/orders` | Place order (`Idempotency-Key`) |
| `DELETE` | `/v1/orders/{id}` | Cancel |
| `GET` | `/v1/accounts/me` | Cash, buying power, positions |
| `GET` | `/v1/orders/{id}` | Status + fills |
| `POST` | `/v1/webhooks/venue` | Signed fill callback |

**Order (201):** `{ accountId, symbol, side, qty, type, limitPrice? }` → `{ orderId, status, holdAmount }`. **409** insufficient buying power; **422** market closed.

## High-Level Design (HLD)

![Robinhood: order svc, ledger, venue adapter, reconciler](/images/hld/robinhood-architecture.svg)

- **Quote Service:** vendor WS → [Redis](/hld/caching-strategies) `quote:{symbol}`; display price ≠ fill price.
- **Order Service:** validate hours/symbol; **`UNIQUE(account_id, idempotency_key)`**; transaction with ledger hold; publish `order.routed`.
- **Ledger Service:** `SELECT accounts FOR UPDATE`; append-only entries (hold, release, debit/credit position); **Redis buying power is hint only**.
- **Venue Adapter:** route to clearing firm; on webhook fill dedup **`execId`** → apply fill, update order `filledQty`.
- **Kafka:** order/fill events → WS gateway, [notification system](/hld/notification-system), nightly reconciliation.
- **WS Gateway:** order status + optional quote stream.

**Buy flow:** lock account → check buying power (market: collar on ask) → hold cash → accept → route venue → async fill → release hold, debit cash, credit shares.

**Quote read:** Redis only.

## Deep dive — money races and venue flakiness

Two phones, $100, two $90 buys: second tx must see **buyingPower = 100 − holds** under row lock → reject. Never trust Redis for spends.

Venue timeout ≠ rejected — **`GET venue by clientOrderId`**. Webhook before DB row exists: buffer/reconcile. Partial fills: multiple `execId`s; idempotent ledger per fill. Market buy hold: `qty × ask × 1.05` collar, release excess on fill.

## Deep dive — market hours and reconciliation

Closed: **REJECT** `market_closed` or queue for open — state choice. Nightly job compares internal ledger vs venue report; alert mismatch. Corporate actions: batch job with `corporate_action_id` dedup.

## Failures and scale

- Venue down: orders stay routed; holds remain; retry + DLQ.
- Duplicate fill webhook: PK on `execId` — no double credit.
- App crash after hold: transactional outbox republishes route event.
- Shard orders/ledger by `accountId`; Kafka partition by account for ordering.
- [Rate limiter](/hld/rate-limiter) ~10 orders/min/account.
- Postgres sync rep for ledger; quote path degrades independently.

**Phrase:** Ledger first, per-account serialization, idempotent order ids. Quotes are a cache. A venue box executes; we record fills from it — we don't match stocks in a weekend project.

**Remember:** FOR UPDATE on account → hold in same txn → venue async → dedup execId → buying power from ledger not Redis.
