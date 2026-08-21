# Online Auction

> eBay-style bids. The last seconds of a popular lot are a **consistency + burst** problem. Whoever wins must match the ledger.

## What they ask

List an item, bid, highest bid wins when the clock hits zero. Sniping. No two winners.

## Requirements

**Functional:** create auction, bid, watch, close, notify winner.

**Non-functional:** **serializable** outcome for the winning bid, handle a spike in the last 10s, durable history.

**Clarify:** English auction (highest bid), reserve price, anti-snipe extra 30s or not.

## API

1. `POST /auctions`
2. `POST /auctions/{id}/bids` `{ amount }`
3. `GET /auctions/{id}` current price + time left
4. `WS /auctions/{id}` live price

## Design

**Auction row** in Postgres: `status, end_at, current_price, winner_id, version`.

**Bid:** transaction: `SELECT … FOR UPDATE` the auction, check `now < end_at` and `amount >= min`, insert bid row, update current price. Return 409 if too low.

**Hot path optimization:** for a quiet auction this is enough. For a viral lot, a **single-threaded bid worker per auctionId** (Kafka partition = auctionId, or Redis lock) serializes bids so the DB isn't a lock storm from 10k connections.

**Read:** cache current price in Redis; WS pub/sub on new high bid. Cache is **not** the judge of who won.

**Close:** scheduler (`end_at`) marks sold, charges winner ([payment system](/system-design/payment-system)), emails. Idempotent close.

## Deep dive — last-second bids

If you only trust Redis `INCR`, a failover can elect two winners. **Close and winner are decided in the DB** (or a consensus log). Redis is for display.

**Anti-snipe:** if a bid lands in the last 30s, extend `end_at`. Write that in the same transaction.

**Clock:** use server time, not the client's JS clock.

**Idempotency:** client `bidId` so a retry doesn't place two bids.

## Extra probes

1. Proxy bidding (max bid stored, system bids incrementally) — extra state machine
2. Fraud / shill bids
3. Images on CDN; listing search via [Elasticsearch](/system-design/elasticsearch)

**Phrase:** "Bids are serialized per item and committed in Postgres. Redis and WebSockets only show the price. The winner is whoever is on the row when we close — once, idempotently."
