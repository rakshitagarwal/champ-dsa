# Robinhood

> Retail brokerage. **Correctness beats latency.** You are designing order intake + a matching/execution story, not a hedge fund.

## What they ask

User buys 10 shares of AAPL. Quote, place order, see fill, update buying power. Market hours. No double-spend of cash.

## Requirements

**Functional:** quotes (delayed OK for v1), place/cancel order, positions, buying power.

**Non-functional:** **exactly-once money**, audit log, market-hours rules, idempotent submits.

**Clarify:** market vs limit orders. Fractional shares. Options (usually out of scope).

## API

1. `GET /quotes/AAPL`
2. `POST /orders` `{ symbol, side, qty, type, idempotencyKey }`
3. `DELETE /orders/{id}` (if still open)
4. `GET /accounts/me/positions`

## Design

**Quotes:** vendor websocket → your quote service → Redis for last price. Not source of truth for fills.

**Account + ledger:** Postgres (or a real ledger DB). **Double-entry**: cash, positions, holds. Placing a buy **holds** cash; fill converts hold → position; cancel releases hold.

**Order service:** persist order `new → routed → filled/cancelled`. Publish to an execution adapter (Apex, clearing firm — a black box). **You do not invent NYSE in 45 minutes.** Draw "execution venue" as a box.

**Idempotency:** unique `(account, key)` so a double tap doesn't submit two buys.

**Market closed:** reject or queue for the open — say which.

## Deep dive — money races

Two devices, two market buys, $100 cash. Both reads see $100. Without a transaction / `SELECT FOR UPDATE` on the account, you overspend. Serialize per `accountId` (row lock or a per-account Kafka partition).

**Partial fills:** order remaining qty; ledger updates incrementally; still idempotent per `execId` from the venue.

**Don't** put buying power in Redis as truth. Cache is a hint; the ledger wins.

**Incidents:** "app down, market moving" — orders still in the durable log; UI can lag.

## Extra probes

1. PDT / pattern day trader rules — compliance service
2. Corporate actions — batch jobs
3. Tax lots — later
4. Related: [payment system](/system-design/payment-system) for ACH deposits (T+ days)

**Phrase:** "Ledger first, per-account serialization, idempotent order ids. Quotes are a cache. A venue box executes; we record fills from it, we don't 'match stocks' on a weekend project."
