# Price Tracking Service

> CamelCamelCamel / Honey without the toolbar politics. Watch a product URL, **poll or scrape**, alert when the price drops.

## What they ask

Design a price tracker where users paste an Amazon (or multi-store) product URL, you record price history over time, show a chart, and send an email/push when the price hits a target. The interviewer wants to see shared polling, politeness, and alert deduplication.

**Scenario:** 1M users watch products, but only 50k unique SKUs exist (everyone watches the same iPhone, PS5, sneakers). Fetching each watch independently would DDoS retailers and bankrupt you. You must dedupe by product, poll on a polite schedule, store a time series, and alert once per meaningful drop — not 50 emails for one dip.

**What interviewer tests:**
- Deduplication: many watches → one fetch job
- Polite crawling / rate limits and ban avoidance
- Time-series storage and downsampling for charts
- Idempotent, non-spammy alerting with edge cases (price $0, currency, stock vs price)

## Requirements

| Category | Requirement |
|---|---|
| **Functional** | Add watch: `{ url, targetPrice, currency }`. List watches. View price history + chart. Set/update target price. Notify (email/push) when `price <= target`. Remove watch. Support multi-store (Amazon, Best Buy, etc.) via site adapters. |
| **Non-functional** | Don't get banned: respect robots.txt, per-host rate limits, backoff on 403. History durable (years). Alerts at-least-once but not spammy (one alert per drop event). Fetch scale: 100k unique products, polling every 15–60 min. |
| **Clarify** | What is "price" — final with shipping/tax? Variants (size/color) separate SKU? How often to check — user-configurable? Price in multiple currencies? Stock availability vs price? Is browser-extension push allowed? Official API vs scrape? |
| **Out of scope v1** | Checkout / auto-buy, coupon aggregation, price prediction ML, retailer affiliate integration, user-to-user sharing. |

## Scale estimation

| Metric | Math | Result |
|---|---|---|
| **Users / watches** | 1M users × avg 5 watches | 5M watches |
| **Unique products (deduped)** | 5M watches, 10% unique rate (popular SKUs) | ~50k–100k unique products |
| **Fetch QPS** | 100k products × 1 fetch / 30 min avg | ~56 fetches/sec avg (100k / 1800s) |
| **Fetch bandwidth** | 56 fetches/sec × 50 KB HTML | ~2.8 MB/s fetch |
| **Storage — price points** | 100k products × 48 points/day (30 min) × 365 days × 32 bytes | ~56 GB/year raw; with indexes ~120 GB |
| **Downsampled** | Keep raw 14 days, then daily min/max for history | Long-term: 100k × 365 × 32 ≈ 1.2 GB/year |
| **Alert QPS** | Assume 5% of fetches trigger a drop | ~3 alerts/sec avg, bursty on sale events |
| **Cache** | Latest price per product in [Redis](/system-design/redis) | 100k × 200 bytes ≈ 20 MB |

Dedup is the entire cost story: without it, 5M watches × 48 fetches/day = 240M fetches/day (2777 rps) — 50x more.

## API Design

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/watches` | Add watch (creates/fetches product if new) |
| `GET` | `/api/v1/watches` | List my watches with latest price + target |
| `GET` | `/api/v1/watches/{id}/history?from=&to=&granularity=` | Price history (raw or downsampled) |
| `PATCH` | `/api/v1/watches/{id}` | Update target price |
| `DELETE` | `/api/v1/watches/{id}` | Remove watch |
| `GET` | `/api/v1/products/{id}` | Product metadata + latest price |
| `POST` | `/internal/fetch/callback` | Fetcher reports price (internal) |

**Add watch — Request/Response:**
```json
POST /api/v1/watches
{
  "url": "https://amazon.com/dp/B0XXXX",
  "targetPrice": 79900, // cents
  "currency": "USD"
}
// 201 Created
{
  "watchId": "w_abc123",
  "productId": "p_amz_b0xxxx",
  "canonicalUrl": "https://amazon.com/dp/B0XXXX",
  "currentPrice": 84900,
  "targetPrice": 79900,
  "status": "ACTIVE"
}
```

**History — Response:**
```json
GET /api/v1/watches/w_abc123/history?granularity=hour&from=2026-08-18
{
  "productId": "p_amz_b0xxxx",
  "points": [
    { "ts": "2026-08-25T10:00:00Z", "price": 84900, "currency": "USD", "inStock": true },
    { "ts": "2026-08-25T10:30:00Z", "price": 79900, "currency": "USD", "inStock": true }
  ],
  "downsampled": false,
  "nextCursor": "eyJ0..."
}
```

Idempotency: `Idempotency-Key` on `POST /watches` prevents duplicate watches on retry.

## High-Level Design (HLD)

```
Client (Web / Extension)
   |
 API Gateway (auth, rate-limit)
   |
 Watch Service (CRUD watches, targets)
   |
 Product Catalog (canonical URL -> productId, dedup)
   |
 [Job Scheduler](/system-design/job-scheduler)  <-->  Fetcher Fleet (per-host polite queues)
   |                                              |
   +--> Postgres (watches, products)              +--> Parser (site adapters, JSON-LD)
   +--> Time-Series Store (price points)          +--> Alert Service -> [Kafka](/system-design/kafka) -> [notification system](/system-design/notification-system)
   +--> [Redis](/system-design/redis) (latest price cache, per-host rate limiter)
   +--> S3 (raw HTML snapshots for debugging/reparse)
```

**Components:**
- **Watch Service:** Validates URL, normalizes to canonical (strip tracking params, resolve redirects), upserts `products` row, creates `watches` row linking user→product. Many users share one `productId`.
- **[Job Scheduler](/system-design/job-scheduler):** Each product has `next_fetch_at`. Scheduler enqueues `FetchJob{productId, url, site}` to a per-host queue. Interval: popular products (many watchers or recent volatility) every 15 min; long tail every 60 min. Adaptive: if price stable for 7 days, back off to 2h.
- **Fetcher Fleet:** Workers with per-host token bucket (e.g., amazon.com: 5 rps globally, 1 rps per worker). Respect `robots.txt`, rotate User-Agent, backoff on 429/403 (exponential, mark host as `COOLDOWN`). Prefer official APIs (Amazon PA-API) first; scrape as fallback — say this in interview.
- **Parser:** Site-specific adapters + generic JSON-LD (`schema.org/Offer`) fallback. Extracts `price`, `currency`, `inStock`, `variant`. Validates: reject `price==0` or `price > 10× last price` as `PARSE_FAILED`.
- **Time-Series Store:** Postgres with TimescaleDB / partitioned table, or dedicated TSDB. Stores `(product_id, ts, price, currency, in_stock)`. Latest price also in Redis for fast reads.
- **Alert Service:** After a valid price write, checks `price <= target AND not already alerted for this drop`. Enqueues notification with idempotency key.

**Write flow — New watch:**
1. `POST /watches {url, target}` → canonicalize URL → lookup `products` by canonical → if missing, insert and schedule immediate fetch.
2. Insert `watches` row; return current cached price (or `PENDING` if first fetch in-flight).

**Write flow — Fetch & alert:**
1. Scheduler enqueues `FetchJob` → Fetcher dequeues per-host (polite) → fetch HTML/API → Parser extracts price.
2. Validate → write `price_points` → update `products.current_price` + `Redis` → publish `PriceUpdated` to [Kafka](/system-design/kafka).
3. Alert Service consumes `PriceUpdated` → for each watch on product where `price <= target`, check dedup → enqueue email/push via [notification system](/system-design/notification-system).

**Read flow — History chart:**
1. `GET /watches/{id}/history` → resolve `productId` → query time-series store with downsampling (raw for 14d, hourly for 90d, daily beyond) → return.

## Low-Level Design (LLD)

**DB Schema (Postgres + TimescaleDB):**
```sql
CREATE TABLE products (
  id              VARCHAR(64) PRIMARY KEY, -- e.g., amz:b0xxxx or hash(canonical_url)
  canonical_url   TEXT UNIQUE NOT NULL,
  domain          VARCHAR(255) NOT NULL, -- amazon.com
  title           TEXT,
  image_url       TEXT,
  currency        VARCHAR(3) NOT NULL DEFAULT 'USD',
  current_price   BIGINT, -- cents, nullable until first fetch
  in_stock        BOOLEAN,
  last_fetched_at TIMESTAMPTZ,
  next_fetch_at   TIMESTAMPTZ NOT NULL,
  fetch_interval_s INT NOT NULL DEFAULT 1800,
  fetch_status    VARCHAR(20) DEFAULT 'OK', -- OK, COOLDOWN, PARSE_FAILED
  created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_products_next_fetch ON products(next_fetch_at) WHERE fetch_status='OK';
CREATE INDEX idx_products_domain ON products(domain);

CREATE TABLE watches (
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT NOT NULL REFERENCES users(id),
  product_id      VARCHAR(64) NOT NULL REFERENCES products(id),
  target_price    BIGINT NOT NULL, -- cents
  currency        VARCHAR(3) NOT NULL DEFAULT 'USD',
  status          VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, PAUSED, DELETED
  last_alerted_price BIGINT,
  last_alerted_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id) -- one watch per user per product
);
CREATE INDEX idx_watches_product ON watches(product_id) WHERE status='ACTIVE';
CREATE INDEX idx_watches_user ON watches(user_id) WHERE status='ACTIVE';

-- Time-series: partitioned by month or Timescale hypertable
CREATE TABLE price_points (
  product_id      VARCHAR(64) NOT NULL REFERENCES products(id),
  ts              TIMESTAMPTZ NOT NULL,
  price           BIGINT NOT NULL,
  currency        VARCHAR(3) NOT NULL,
  in_stock        BOOLEAN NOT NULL DEFAULT true,
  fetch_id        VARCHAR(64), -- for dedup / debugging
  PRIMARY KEY (product_id, ts)
);
CREATE INDEX idx_price_points_ts ON price_points(ts DESC);
-- For Timescale: SELECT create_hypertable('price_points', 'ts', chunk_time_interval => INTERVAL '7 days');

CREATE TABLE alert_log (
  id              BIGSERIAL PRIMARY KEY,
  watch_id        BIGINT NOT NULL REFERENCES watches(id),
  product_id      VARCHAR(64) NOT NULL,
  price           BIGINT NOT NULL,
  ts              TIMESTAMPTZ DEFAULT now(),
  idempotency_key VARCHAR(128) UNIQUE NOT NULL, -- watchId + pricePoint + day
  channel         VARCHAR(20) -- email, push
);
CREATE UNIQUE INDEX uq_alert_idem ON alert_log(idempotency_key);
```

**Key classes / responsibilities:**
```python
class WatchService:
  def add_watch(user_id, url, target_price): # canonicalize, upsert product, insert watch
  def canonicalize(url): # strip utm_*, lower host, follow redirects, extract SKU
  def list_watches(user_id): ...

class FetchScheduler:
  def tick(): # SELECT * FROM products WHERE next_fetch_at <= now() AND fetch_status='OK' ORDER BY next_fetch_at LIMIT 500 FOR UPDATE SKIP LOCKED
  def compute_next_fetch(product): # adaptive: volatility-based, watcher count

class Fetcher:
  def fetch(product): # per-host rate limiter, robots check, HTTP GET with timeout
  def backoff_on_403(domain): # set products.fetch_status='COOLDOWN', next_fetch_at = now()+1h

class Parser:
  def parse(html, domain): -> {price, currency, in_stock} # site adapter or JSON-LD
  def validate(price, last_price): # reject 0, outlier >10x

class AlertService:
  def on_price_update(product_id, price, ts):
    for watch in watches_for_product(product_id):
      if price <= watch.target_price and not already_alerted(watch, price, ts):
        enqueue_notification(watch, price, idempotency_key=f"{watch.id}:{price}:{ts.date()}")
```

**Concurrency & algorithms:**
- **Dedup by product:** `canonical_url` UNIQUE ensures one `productId` per SKU. All watches share one `next_fetch_at` and one price history — the core scaling win.
- **Per-host politeness:** Token bucket per domain in [Redis](/system-design/redis): `INCR` with sliding window or `SET` with TTL. Global cap per domain (e.g., 5 rps for amazon.com) shared across fetcher replicas. On 429, set `COOLDOWN` and jitter retry.
- **Downsampling:** Raw points for 14 days; continuous aggregate (Timescale) or cron job computes `SELECT product_id, date_trunc('day', ts), MIN(price), MAX(price) FROM price_points GROUP BY 1,2` for older data. Chart queries pick granularity by `from/to` range.
- **Alert idempotency:** `idempotency_key = watchId + pricePoint + day` UNIQUE prevents 50 emails for one drop. Also guard: only alert when price *crosses* target downward (track `last_alerted_price`; if last alert was at $80 and price stays $79, don't re-alert until price goes above target then drops again).

**Patterns used:** Shared polling / Flyweight (one fetch per product), Adapter (per-site parsers), Token bucket rate limiting, Time-series partitioning, Idempotency key, Outbox ([Kafka](/system-design/kafka) `PriceUpdated`).

## Deep dive — shared watches and ban avoidance

10k users watching 200 unique products → 200 fetch jobs, not 10k. That's the win. Without dedup, you'd need 10k × 48 fetches/day = 480k fetches for those products alone; with dedup, 200 × 48 = 9.6k (50× reduction). For **burst after a viral deal** (e.g., tweet "PS5 $399"), still one fetch per SKU — cache the latest price in [Redis](/system-design/redis) with 30s TTL and serve watch-list reads from cache. For **bans**: mention official APIs first (Amazon PA-API, Best Buy API), scrape only as fallback with `robots.txt` respect, `User-Agent` identifying your bot, and exponential backoff on 403. Adding random jitter and respecting `Crawl-Delay` signals maturity.

## Deep dive — wrong parses and price semantics

**Wrong parse (price $0):** Don't write garbage and don't alert. Parser validation: if `price == 0` or `price is null` or `abs(price - last_price)/last_price > 0.9` (90% swing), mark `fetch_status=PARSE_FAILED`, keep old price, alert ops if error rate >5% for a domain (site redesign). Keep raw HTML in S3 for reparse. **Price semantics:** Define what "price" means — final price including shipping? Before tax? Multi-currency: store `currency` per point and per watch; only alert when currencies match or convert via FX table. **Stock vs price:** `in_stock=false` should not trigger a price alert (out-of-stock price is irrelevant); chart shows gap.

## Deep dive — alert correctness without spam

Naively alerting on every `price <= target` point spams on a sustained sale (every 30 min fetch sends an email). Correct logic: alert **once per drop event** — when price crosses below target and hasn't been alerted for that crossing. Implementation: `watches.last_alerted_price` + `alert_log` with `idempotency_key = watchId + price + day`. On `PriceUpdated`, if `price <= target` and `(last_alerted_at is null OR price < last_alerted_price - threshold OR now() - last_alerted_at > 24h)` then alert and update `last_alerted_at`. For price rising above target then dropping again, reset so the next drop re-alerts. Use [notification system](/system-design/notification-system) dedup on top.

## Handling failures and scale

| Failure | Handling |
|---|---|
| **Fetcher banned (403 storm)** | Mark domain `COOLDOWN`, set `next_fetch_at = now() + 1h` with jitter, reduce per-host rate, alert; parser fallback to API. |
| **Parser broken (site redesign)** | `PARSE_FAILED`, don't overwrite price_points; keep serving stale price; S3 HTML retained for fix + replay. |
| **Time-series DB overload** | Partition by month / hypertable; downsample job; add read replica for history queries; cache latest in Redis. |
| **Alert service down** | Price points still written; `PriceUpdated` events queue in Kafka; replay on recovery; idempotency prevents double-send. |
| **Viral product** | Dedup ensures one fetch; fan-out to watches via batched query `SELECT * FROM watches WHERE product_id=?` with cursor pagination to avoid loading 1M rows at once. |
| **Scale — more products** | Shard `products`/`price_points` by `hash(product_id)`; shard scheduler by hash range; scale fetcher fleet per domain. |
| **Extension sending untrusted prices** | Treat as hint only; still verify via server-side fetch before alerting. |

## Extra probes / follow-ups

1. Multi-currency / shipping — define "price" as landed cost; store `price + shipping` if available.
2. Stock vs price — show OOS gaps on chart; don't alert on OOS price.
3. Browser extension sending prices — treat as untrusted input; server verifies.
4. Price prediction — moving average / volatility-based fetch interval.
5. Affiliate / legal — mention ToS; prefer official APIs; scrape politely as fallback.

**Phrase:** "Dedupe by product, poll on a polite schedule, store a time series, alert once per drop with an idempotency key. Users share fetches."
