# Robinhood

> Retail brokerage. **Correctness beats latency.** You are designing order intake + a matching/execution story, not a hedge fund.

## What they ask

Interviewer: *"Design Robinhood — a user buys 10 shares of AAPL, sees quotes, places market/limit orders, and tracks positions + buying power. Market is open 9:30-4 ET, handle concurrency and no double-spend."*

What they really test:
- **Money correctness:** Double-entry ledger, holds vs settled cash, no overspend under concurrent orders from two devices.
- **Idempotent order intake:** Double-tap "Buy" must not create two orders or two holds.
- **Boundary with execution:** You don't build NYSE — you model an *execution venue adapter* (Apex / clearing firm) that asynchronously fills. Can you keep state machines and reconciliation clean?
- **Market rules:** Market vs limit, trading hours, partial fills, corporate actions deferred — do you scope the interview?

Example scale: 10M funded accounts, 2M DAU, ~500k orders/day (peak 5k orders/sec at open). Quotes: 8k symbols × tick per second → 8k QPS fan-out cached. Ledger: 1B entries/year — append-only, never update in place.

## Requirements

**Functional:**
- **Quotes:** `GET /quotes/{symbol}` — delayed 15m OK in v1, real-time stretch; sparkline history optional.
- **Accounts:** cash balance, buying power (cash + margin placeholder), positions per symbol (qty, avg cost basis).
- **Orders:** market and limit (`side: buy/sell`, `qty`, `type`, `limitPrice`), cancel open orders, list orders with status, view fills.
- **Execution story:** order `new → accepted → routed → partially_filled → filled | cancelled | rejected`; fills create ledger entries and position updates.
- **Hold accounting:** on buy, hold cash `qty * price` (market: estimate with limit collar; limit: `qty * limitPrice`); on sell, hold shares.
- **Market hours:** `9:30-16:00 ET Mon-Fri`, reject or queue orders when closed (explicit choice).
- **Idempotent submit** via `idempotencyKey` per account.

**Non-functional:**
- **Exactly-once money effect** — ledger is source of truth, not cache.
- **Per-account serializability** — no double-spend even with concurrent submits.
- **Audit trail:** every debit/credit immutable, reconcilable with clearing firm reports.
- **Availability:** quote path can degrade (stale cache OK), order path must be durable even if venue is down.
- **Latency:** order accept < 200ms; fill notification async via push/websocket.

**Clarify:**
- Market vs limit only, or stop/stop-limit/options? (Keep to market+limit in 45 min)
- Fractional shares? (Defer — adds lot math)
- Margin vs cash-only? (Cash-only simplifies buying power)
- Real execution vs simulated? (Treat venue as black box)
- Settlement T+1 vs instant credit? (Instant buying power from holds, settlement deferred)

**Out of scope (v1):**
- Building matching engine (we route to venue).
- Options, crypto 24/7, after-hours trading.
- Tax lots (FIFO placeholder, real lots v2), dividends/splits batch jobs.
- Charting, news, analyst data — quote enrichment deferred.

## Scale estimation

| Parameter | Assumption | Math | Result |
|---|---|---|---|
| Funded accounts | 10M | — | 10M |
| DAU | 2M | — | 2M |
| Orders/day | 500k avg, 2× on volatile day | 500k/86400 | **~6 QPS avg, 50 QPS peak, 5k QPS at open burst** |
| Quotes QPS | 2M users × poll every 30s + app open 5 symbols | 2M/30 × 5 | **~330k QPS** if polling — must push/cache, not hit DB |
| Quote ticks ingress | 8k symbols × 1 tick/sec | — | 8k msgs/sec from vendor WS → fan-out via [Redis](/system-design/redis) |
| Ledger entries | 2 entries/order (hold + fill) + cancel releases | 1M/day | **~30M/month**, ~1B/3yr — range-partition by month |
| Storage | order row 500B, fill 300B, ledger 200B | 1M orders/mo × 1KB | ~1GB/mo orders, 6GB/mo ledger — small, but must be *durable* (multi-AZ) |

Bandwidth dominated by quote distribution — put it behind [Redis](/system-design/redis) / CDN edge, not Postgres.

## API Design

```http
GET /v1/quotes/{symbol}
→ 200 { "symbol":"AAPL", "price":"182.34", "bid":"182.33", "ask":"182.35",
        "asOf":"2026-05-13T13:45:00Z", "isDelayed": false }

GET /v1/quotes/batch?symbols=AAPL,MSFT,TSLA

POST /v1/orders
Idempotency-Key: key_abc
{
  "accountId": "acct_123",
  "symbol": "AAPL",
  "side": "buy",
  "qty": "10",                 // string decimal for fractional-ready
  "type": "market",            // market | limit
  "limitPrice": null,          // required if limit
  "timeInForce": "day",        // day | gtc
  "idempotencyKey": "key_abc"
}
→ 201 { "orderId":"ord_1", "status":"accepted", "holdAmount":"1823.40" }
→ 409 { "error":"insufficient_buying_power" }  // or 422 market_closed

DELETE /v1/orders/{orderId}     // cancel if still open/routed
→ 200 { "orderId":"ord_1", "status":"cancel_pending" }

GET /v1/accounts/me
→ 200 { "accountId":"acct_123", "cash":"5000.00", "buyingPower":"5000.00",
        "holds":"1823.40", "positions":[{"symbol":"AAPL","qty":"5","avgCost":"180.00"}] }

GET /v1/orders?accountId=acct_123&status=open&limit=20&cursor=
GET /v1/orders/{orderId}       // includes fills array

POST /v1/webhooks/venue        // clearing firm fill callback, signed
{ "venueOrderId":"v_99", "orderId":"ord_1", "execId":"exec_1", "filledQty":"10", "fillPrice":"182.40", "at":"2026-05-13T13:45:01Z" }

GET /v1/accounts/me/ledger?from=&to=&cursor=   // audit, internal
```

All money endpoints are **idempotent via `Idempotency-Key`**. Quote endpoints are cacheable (`Cache-Control: max-age=1`).

## High-Level Design (HLD)

```
[Mobile/Web] ──▶ [CDN] ──▶ [API Gateway + Auth + Rate Limiter] ──▶ [Quote Service] ──▶ [Redis (last price + 1m candles)]
   │                              │                                      │
   │                              │  POST /orders                        │  vendor WS (Polygon/IEX) ticks
   │                              ▼                                      ▼
   │                        [Order Service] ◀──────────────────── [Venue Adapter / Clearing Firm]
   │                              │   │  holds cash/shares               │  (Apex, Citadel box — async fills)
   │                              │   │  states: new→routed→filled       │
   │                              │   ▼                                  │
   │                              │ [Account + Ledger Service] ──▶ [Postgres (ledger, orders, positions)]
   │                              │         ▲                              │  (primary + replica, append-only)
   │                              │         │ per-account serialization     │
   │                              └─────────┴──────────────────────────────┘
   │                                    │
   │                              ┌─────▼─────┐
   │                              │  [Kafka]  │  topics: order.events, fill.events, ledger.events
   │                              └─────┬─────┘
   │                                    │
   │                    ┌───────────────┼────────────────┐
   │                    ▼               ▼                ▼
   │           [Push/WS Gateway]  [Notification]  [Reconciliation Job (nightly)]
   │                    │
   └────────────────────┘  WS: order status + quote stream
```

**Component roles:**
- **Quote Service:** consumes vendor websocket, normalizes ticks, writes to [Redis](/system-design/redis) (`quote:AAPL → {price, ts}` + sorted set for 1m candles). Serves `GET /quotes` from Redis, not DB. Stale quote does not block order (order uses venue's fill price, not displayed quote).
- **Order Service:** validates `symbol/tradingHours/qty`, checks idempotency `UNIQUE(account_id, idempotency_key)`, atomically creates `orders` row + `holds` ledger entry inside a per-account transaction. Publishes `order.routed` to [Kafka](/system-design/kafka), calls Venue Adapter (async). Owns order state machine.
- **Account + Ledger Service:** the **money brain**. Holds Postgres tables `accounts`, `positions`, `ledger_entries`. All money mutations go through this service with `SELECT ... FOR UPDATE` on `accounts` row (or per-account Kafka partition serialization) to prevent overspend. Cache (Redis) of buying power is *hint only* — DB wins on conflict.
- **Venue Adapter:** translates internal order → venue API (FIX or REST), polls or receives webhook fills. On fill callback, validates signature, deduplicates on `execId`, appends ledger entries (release hold → debit cash / credit position), updates order `filledQty`.
- **[Kafka](/system-design/kafka):** decouples order acceptance from fill processing; drives push notifications and nightly reconciliation without coupling to venue latency.
- **WS Gateway:** streams `orderStatusChanged` and quote ticks to subscribed clients; stateless, sticky by `accountId` optional.

**Data flow — buy 10 AAPL market:**
1. `POST /orders` → Order Service `BEGIN; SELECT * FROM accounts WHERE id=acct_123 FOR UPDATE;` check `buyingPower >= 10*ask*collar`; `INSERT orders (accepted) + INSERT ledger (hold cash 1823.40)`; `COMMIT`; publish `order.routed`; return 201.
2. Venue Adapter `POST` to clearing firm with `clientOrderId=ord_1`; firm acks `routed`.
3. Async `POST /webhooks/venue` with fill `10 @182.40, execId=exec_1` → Venue Adapter dedup on `execId` → call Ledger Service: release hold, debit cash 1824.00, credit position 10 shares, update `avgCost` → publish `order.filled` → WS pushes to client.

**Data flow — quote read:** App `GET /quotes/AAPL` → API Gateway → Quote Service → `GET` Redis `quote:AAPL` → return. Vendor tick loop updates Redis every 100ms independently.

## Low-Level Design (LLD)

**Database schema (Postgres, ledger is append-only):**

```sql
CREATE TABLE accounts (
  id              UUID PRIMARY KEY,
  user_id         UUID NOT NULL,
  cash            NUMERIC(18,2) NOT NULL DEFAULT 0, -- settled cash
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- buyingPower = cash - sum(holds where not released) ; computed or materialized

CREATE TABLE positions (
  account_id      UUID REFERENCES accounts(id),
  symbol          TEXT NOT NULL,
  qty             NUMERIC(18,6) NOT NULL DEFAULT 0, -- supports fractional later
  avg_cost        NUMERIC(18,4) NOT NULL DEFAULT 0,
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (account_id, symbol)
);

CREATE TABLE orders (
  id                UUID PRIMARY KEY,
  account_id        UUID NOT NULL REFERENCES accounts(id),
  symbol            TEXT NOT NULL,
  side              TEXT NOT NULL CHECK (side IN ('buy','sell')),
  type              TEXT NOT NULL CHECK (type IN ('market','limit')),
  qty               NUMERIC(18,6) NOT NULL,
  limit_price       NUMERIC(18,4),
  time_in_force     TEXT NOT NULL DEFAULT 'day',
  status            TEXT NOT NULL CHECK (status IN ('accepted','routed','partially_filled','filled','cancelled','rejected','cancel_pending')),
  filled_qty        NUMERIC(18,6) NOT NULL DEFAULT 0,
  avg_fill_price    NUMERIC(18,4),
  idempotency_key   TEXT NOT NULL,
  venue_order_id    TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (account_id, idempotency_key)
);
CREATE INDEX ON orders (account_id, created_at DESC);
CREATE INDEX ON orders (status) WHERE status IN ('accepted','routed','partially_filled');

CREATE TABLE fills (
  exec_id         TEXT PRIMARY KEY, -- venue's unique execution id
  order_id        UUID NOT NULL REFERENCES orders(id),
  qty             NUMERIC(18,6) NOT NULL,
  price           NUMERIC(18,4) NOT NULL,
  filled_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON fills (order_id);

-- Double-entry ledger: every row is immutable
CREATE TABLE ledger_entries (
  id              BIGSERIAL PRIMARY KEY,
  account_id      UUID NOT NULL REFERENCES accounts(id),
  entry_type      TEXT NOT NULL CHECK (entry_type IN ('hold_buy_cash','release_hold','buy_cash_debit','buy_position_credit','sell_position_debit','sell_cash_credit','deposit','withdrawal')),
  amount          NUMERIC(18,2) NOT NULL, -- for position entries, qty stored separately
  qty             NUMERIC(18,6),
  symbol          TEXT,
  order_id        UUID REFERENCES orders(id),
  fill_exec_id    TEXT REFERENCES fills(exec_id),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX ON ledger_entries (account_id, created_at DESC);
CREATE INDEX ON ledger_entries (order_id);

CREATE TABLE venue_callbacks (
  exec_id TEXT PRIMARY KEY,
  payload JSONB NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**Key classes:**

```text
QuoteService        — onTick(symbol, price): SET quote:{symbol} + ZADD candles
OrderController     — POST /orders → idempotency check → OrderService.place()
OrderService        — @Transactional place(): lock account row, check buyingPower, insert order + ledger hold, publish Kafka
LedgerService       — hold(), releaseHold(), applyFill(execId): idempotent, double-entry
VenueAdapter        — route(order): POST to clearing firm, handle timeout via retrieve-by-clientOrderId
FillHandler         — onWebhook(execId): dedup venue_callbacks, call LedgerService.applyFill(), update Order + Position
PositionService     — recalc avgCost on buy: newAvg = (oldQty*oldAvg + fillQty*fillPrice)/(oldQty+fillQty)
RiskService         — check PDT, marketHours, sell qty <= position.qty + holds
```

**Concurrency / algorithms:**
- **Per-account serialization:** `SELECT ... FOR UPDATE` on `accounts` inside order placement transaction. Alternative: partition [Kafka](/system-design/kafka) by `accountId` and single-thread per partition consumer. Either prevents the classic race: two devices read $100, both think they can buy $90 — without lock you double-spend.
- **Idempotency:** DB unique constraint `(account_id, idempotency_key)` → double tap returns existing `orderId` without second hold.
- **Partial fills:** `fills` table dedup on `execId`; `orders.filled_qty += fill.qty` incrementally; ledger entry per fill with idempotency on `fill_exec_id`.
- **Avg cost:** weighted average on buys; sells don't change avg cost (FIFO lots deferred to v2).
- **Hold collar for market buy:** hold = `qty * (ask * 1.05)` (5% collar) — release excess on fill so user isn't over-held.

**Design patterns:** Transactional Outbox, State Machine (order status), Idempotent Receiver (fills), Double-Entry Ledger, Circuit Breaker on venue client.

## Deep dive — Money races and why cache is not truth

Two phones, $100 cash, two market buys for $90 each at the same millisecond. Both `GET /accounts` see `buyingPower 100`. Without serialization, both `INSERT ledger hold 90` succeed and you've held $180 against $100. Fix: **the ledger transaction locks the account row**. Sequence: Tx1 `SELECT ... FOR UPDATE` gets lock, checks `buyingPower 100 >= 90` → holds 90 → commits. Tx2 now acquires lock, recomputes `buyingPower = cash - holds = 100 - 90 = 10`, sees `10 < 90` → rejects with `insufficient_buying_power`. Never compute buying power in [Redis](/system-design/redis) and treat it as truth — Redis is a display hint populated from ledger after commit. Similarly, sells must check `positions.qty` under lock and hold shares (decrement available) so double-sell doesn't oversell.

## Deep dive — Venue as a flaky colleague and partial fills

We do not build an order book — we delegate to a venue. That means: network timeout after `POST /venue/orders` doesn't mean order wasn't accepted. **Don't blindly retry.** Instead `GET /venue/orders?clientOrderId=ord_1` to check. Venue may send fill webhook *before* your `POST` response returns — so webhook handler must handle `orderId` not yet `routed` in your DB (buffer or upsert, then reconcile). Partial fills: an order for 100 shares may fill `40 @182.30` then `60 @182.50` with two `execId`s. Each fill is an independent ledger movement and position bump; order stays `partially_filled` until `filledQty == qty`. All fill processing is idempotent on `execId` via `venue_callbacks` PK — replayed webhooks are no-ops.

## Handling failures and scale

- **Sharding:** Orders and ledger partitioned by `accountId` hash (or range by `accountId`). Quotes sharded by `symbol` in [Redis](/system-design/redis). [Kafka](/system-design/kafka) topic `order.events` partitioned by `accountId` to preserve per-account ordering.
- **Caching:** Quote Redis is write-through from vendor WS; order/account reads use `Cache-Aside` with short TTL (5s) — but writes always go to Postgres and invalidate cache. Buying power cache invalidated on every ledger commit.
- **Replication:** Postgres synchronous replication for ledger (zero data loss); async replica for quote-history analytics. Kafka RF=3.
- **Failure modes:**
  - *Venue down:* orders stay `routed`, fills delayed; UI shows "pending execution" — no money lost, ledger holds remain. Venue adapter retries with backoff + DLQ.
  - *App crash after hold but before publish:* transactional outbox ensures order + outbox event commit atomically; poller republishes.
  - *Duplicate fill webhook:* PK on `fills.exec_id` drops duplicate; ledger not double-credited.
  - *Market closed:* configurable — `REJECT` with `market_closed` error (clear to user) or `QUEUE_FOR_OPEN` (store `accepted`, scheduler routes at 9:30).
  - *Split/dividend:* nightly batch job adjusts `positions` and inserts corporate-action ledger entries; replay-safe via `corporate_action_id` dedup.
- **Probes:** alert on `reconciliation mismatch` (internal ledger vs venue report), consumer lag on fill topic, hold leakage (holds older than 1 day), and `buyingPower` negative invariant violation.

## Extra probes / Interview follow-ups

1. **PDT rule:** Track day trades per account in last 5 business days; block 4th day trade for < $25k accounts — compliance service before `place()`.
2. **Fractional shares:** Change `qty` to decimal, handle `avgCost` with higher precision, venue may support fractional route vs internal fractional aggregation.
3. **Short selling:** Needs locate + margin — separate flow, not v1.
4. **ACH deposits:** Use [payment system](/system-design/payment-system) flow — `pending → posted` days later, ledger holds buying power instantly but settled cash delayed.
5. **Tax lots:** FIFO vs specific lot — store lot table `lots(accountId, symbol, qty, costBasis, acquiredAt)` and consume on sells.
6. **Related systems:** [Rate limiter](/system-design/rate-limiter) on order placement (10/min per account), [metrics monitoring](/system-design/metrics-monitoring) on fill latency.

**Phrase:** "Ledger first, per-account serialization, idempotent order ids. Quotes are a cache. A venue box executes; we record fills from it, we don't 'match stocks' on a weekend project."
