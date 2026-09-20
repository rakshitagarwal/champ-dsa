# Price Tracking Service

> CamelCamelCamel / Honey style. Watch a product URL, **poll politely**, alert when price drops.

> Dedupe watches by product SKU — one fetch schedule, time-series history, alert once per drop with idempotency key.

## What they ask

**Scenario:** 1M users, 5M watches, but **50k unique SKUs** (everyone watches the same iPhone). Independent polling would DDoS retailers. Dedupe by product, polite schedule, time series, **one alert per meaningful drop**.

**What the interviewer really tests:**
- Many watches → one fetch job
- Politeness / ban avoidance
- Time-series storage + downsampling for charts
- Idempotent, non-spammy alerts ($0 parse, stock vs price)

## Requirements

**Functional:** Add watch `{ url, targetPrice }`, list watches, price history/chart, update target, notify when `price <= target`, remove watch. Multi-store via site adapters.

**Non-functional:** robots.txt + per-host limits; years of history; at-least-once alerts but not spam; 100k products, poll 15–60 min.

**Clarify:** Price includes shipping/tax? Variants as separate SKU? User poll interval? Official API vs scrape? Multi-currency? Alert when out of stock?

**Out of scope (v1):** Auto-buy, coupon ML, affiliate checkout.

## Scale estimation

| Metric | Result |
|--------|--------|
| Watches | 5M; **~50k–100k unique products** after dedup |
| Fetch QPS | 100k / 30 min → **~56/s** (vs 2777/s without dedup) |
| TS storage | ~120 GB/year raw; downsample → ~1.2 GB/year long-term |
| Alerts | ~3/s avg; bursty on sale days |

Dedup is the entire cost story.

## API Design

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/v1/watches` | Add watch |
| `GET` | `/api/v1/watches` | List with latest price |
| `GET` | `/api/v1/watches/{id}/history` | Chart (`granularity=hour|day`) |
| `PATCH` | `/api/v1/watches/{id}` | Update target |
| `DELETE` | `/api/v1/watches/{id}` | Remove |

**Create (201):** `{ url, targetPrice, currency }` → `{ watchId, productId, currentPrice, targetPrice }`. `Idempotency-Key` on create.

## High-Level Design (HLD)

![Price tracking: watches, scrape schedule, parsers, alerts](/images/hld/price-tracking-architecture.svg)

- **Watch Service:** canonical URL → `productId`; many users → one product row.
- **[Job Scheduler](/hld/job-scheduler):** `next_fetch_at` per product; popular/volatile → 15 min, stable → 2h backoff.
- **Fetcher fleet:** per-domain token bucket in [Redis](/hld/caching-strategies); PA-API first, scrape fallback; 403 → COOLDOWN + jitter.
- **Parser:** site adapters + JSON-LD `Offer`; reject `price==0` or >10× swing → `PARSE_FAILED`, keep stale price.
- **Time-series:** Timescale/partitioned `price_points`; latest in Redis.
- **Alert Service:** on `PriceUpdated`, watches where `price <= target` + dedup key → [notification system](/hld/notification-system).
- **S3:** raw HTML for reparse.

**New watch:** canonicalize → upsert product → schedule fetch → insert watch.

**Fetch loop:** polite dequeue → parse → write point → Kafka `PriceUpdated` → alert worker.

**History:** downsample — raw 14d, hourly 90d, daily beyond.

## Deep dive — shared watches and parse safety

10k users × 200 SKUs = **200 fetch jobs**, not 10k. Viral deal: one fetch, Redis latest for watch-list reads.

Never alert on garbage: S3 retain HTML; ops alert if domain error rate >5%. **OOS:** don't alert on meaningless OOS price. Alert **once per crossing** — track `last_alerted_price`; sustained sale shouldn't email every 30 min.

## Deep dive — alert idempotency

`idempotency_key = watchId + price + day` in alert log. Re-alert only if price rises above target then drops again. Batch fan-out to watches with cursor pagination (don't load 1M rows at once).

## Failures and scale

- Domain banned: COOLDOWN 1h, reduce rate, prefer API.
- Parser broken: stale price served; replay from S3 after fix.
- TSDB hot: partition/hypertable; replica for history queries.
- Alert down: Kafka buffers `PriceUpdated`; replay idempotent.
- Extension untrusted prices: server-side fetch before notify.
- Shard products by hash; scale fetchers per domain.

**Phrase:** Dedupe by product, poll on a polite schedule, store a time series, alert once per drop with an idempotency key. Users share fetches.

**Remember:** canonical_url UNIQUE → one scheduler per product → validate parse → cross-below-target once → PA-API before scrape.
