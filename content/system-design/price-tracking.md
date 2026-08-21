# Price Tracking Service

> CamelCamelCamel / Honey without the toolbar politics. Watch a product URL, **poll or scrape**, alert when the price drops.

## What they ask

User pastes an Amazon (or multi-store) link. You record price over time. Email/push when it hits a target.

## Requirements

**Functional:** add watch, list history, set target, notify.

**Non-functional:** don't get banned (polite crawl), history durable, alerts **at-least-once** but not 50 emails for one drop.

## API

1. `POST /watches` `{ url, targetPrice }`
2. `GET /watches/{id}/history`
3. `DELETE /watches/{id}`

## Design

**Catalog:** Product keyed by canonical URL / SKU. Many users watching the same ASIN share **one** fetch.

**Fetcher fleet:** [job scheduler](/system-design/job-scheduler) — each product has `next_fetch_at`. Respect robots, backoff on 403, rotate identity if they ask (stay high-level: "don't hammer").

**Parse:** site-specific parsers or a generic JSON-LD scrape. Store `(product_id, ts, price, currency)` in Postgres or a time-series store.

**Alert:** if `price <= target` and not already alerted this drop, enqueue [notification](/system-design/notification-system). Idempotency key: `watchId + pricePoint + day`.

**Chart:** read history; downsample old points (keep daily min for years, raw for 2 weeks).

## Deep dive — shared watches and bans

10k users, 200 unique products → 200 fetch jobs, not 10k. That's the win.

**Burst after a viral deal:** still one fetch per SKU; cache the latest price for the page.

**Wrong parse (price $0):** don't alert; mark fetch failed; don't write garbage.

**Legal / ToS:** in an interview, mention official APIs first, scrape as fallback with rate limits.

## Extra probes

1. Multi-currency / shipping — define what "price" means
2. Stock vs price
3. Browser extension sending prices — treat as untrusted input

**Phrase:** "Dedupe by product, poll on a polite schedule, store a time series, alert once per drop with an idempotency key. Users share fetches."
